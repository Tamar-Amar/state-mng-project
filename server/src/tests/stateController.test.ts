import request from 'supertest';
import app from '../index'; 
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { State } from '../models/State';
import PermissionRequest from '../models/PermissionRequest';
import User from '../models/User';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('State API Tests', () => {
  test('Should add a valid state', async () => {
    const newState = {
      name: 'Unique Test State',
      flag: 'https://example.com/unique.svg',
      population: 100000,
      region: 'Test Region',
    };

    const response = await request(app).post('/api/states').send(newState);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newState);
  });

  test('Should return an error for invalid state data', async () => {
    const invalidState = {
      name: '',
      flag: 'not-a-url',
      population: -100,
      region: 'Test Region',
    };

    const response = await request(app).post('/api/states').send(invalidState);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Should retrieve a state by ID', async () => {
    const state = await State.create({
      name: 'Existing State For Test',
      flag: 'https://example.com/existing.svg',
      population: 50000,
      region: 'Existing Region',
    });

    const response = await request(app).get(`/api/states/${state._id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Existing State For Test');
  });

  test('Should return 404 for non-existing state', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app).get(`/api/states/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('State not found');
  });
});

describe('Region API Tests', () => {
  test('Should add a valid region', async () => {
    const newRegion = {
      nameRegion: 'Test Region',
    };
    const response = await request(app).post('/api/regions').send(newRegion);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newRegion);
  });

  test('Should not allow duplicate region names', async () => {
    const newRegion = { nameRegion: 'Unique Region' };
    await request(app).post('/api/regions').send(newRegion);
    const response = await request(app).post('/api/regions').send(newRegion);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

describe('City API Tests', () => {
  test('Should add a valid city to a state', async () => {
    const state = await State.create({
      name: 'State For City',
      flag: 'https://example.com/flag.svg',
      population: 200000,
      region: 'Some Region',
    });
    const newCity = {
      cityName: 'Test City',
      isActive: true,
      stateId: state._id,
    };
    const response = await request(app).post('/api/cities/add').send(newCity);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ cityName: 'Test City', isActive: true });
  });

  test('Should return error for invalid city name', async () => {
    const state = await State.create({
      name: 'State For Invalid City',
      flag: 'https://example.com/flag.svg',
      population: 200000,
      region: 'Some Region',
    });
    const invalidCity = {
      cityName: '123', 
      isActive: true,
      stateId: state._id,
    };
    const response = await request(app).post('/api/cities/add').send(invalidCity);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('Permission Request API Tests', () => {
  test('Should add a valid permission request', async () => {
    const user = await User.create({
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      email: 'test@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'user',
      profilePicture: '',
    });
    const newRequest = {
      user: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      requestedPermissions: {
        canAdd: true,
        canUpdate: false,
        canDelete: false,
      },
      status: 'pending',
    };
    const response = await request(app).post('/api/permission-requests').send(newRequest);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ status: 'pending' });
  });

  test('Should update permission request status', async () => {
    const user = await User.create({
      firstName: 'Test',
      lastName: 'User2',
      username: 'testuser2',
      email: 'test2@example.com',
      phone: '1234567890',
      password: 'password123',
      role: 'user',
      profilePicture: '',
    });
    const requestDoc = await PermissionRequest.create({
      user: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      requestedPermissions: {
        canAdd: true,
        canUpdate: false,
        canDelete: false,
      },
      status: 'pending',
    });
    const response = await request(app)
      .patch(`/api/permission-requests/${requestDoc._id}/approve`)
      .send({ status: 'approved', reviewedBy: user._id, admin: user._id  });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Permission request approved');
  });
  
});

describe('User API Tests', () => {
  test('Should register a new user', async () => {
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phone: '5551234567',
      password: 'secret123',
      role: 'user',
      profilePicture: '',
    };
    const response = await request(app).post('/api/users/register').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.user).toMatchObject({ email: 'john@example.com', username: 'johndoe' });

  });

  test('Should not register a user with duplicate email', async () => {
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      phone: '5559876543',
      password: 'secret123',
      role: 'user',
      profilePicture: '',
    };
    await request(app).post('/api/users/register').send(userData);
    const response = await request(app).post('/api/users/register').send(userData);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

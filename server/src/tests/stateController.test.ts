import request from 'supertest';
import app from '../index';
import mongoose from 'mongoose';
import State from '../models/State';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || '');
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('State Controller Tests', () => {
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

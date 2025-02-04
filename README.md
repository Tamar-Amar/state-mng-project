# 🌍 Country & City Management API

## 📚 Overview
A **full-stack application** for managing **countries and cities** using **MongoDB, Express.js, and React**. The system supports **soft delete** (`isActive: false`).

## 🚀 Technologies
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** React, React Query, Recoil, MUI
- **Authentication:** JWT


## ⚙️ Setup

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/your-repo/country-management-project.git
cd country-management-project
```

### 2️⃣ Backend Setup
```bash
cd server
npm install
```
- **.env Configuration:**
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```
- **Run Backend:**
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

## 🌍 API Endpoints

### 📌 Country (State) Management
| Method   | Endpoint                  | Description                 |
|----------|---------------------------|-----------------------------|
| `GET`    | `/api/states`             | Get all active countries    |
| `GET`    | `/api/states/:id`         | Get country by ID           |
| `POST`   | `/api/states`             | Add a new country           |
| `PATCH`  | `/api/states/:id/restore` | Restore a deleted country   |
| `PUT`    | `/api/states/:id`         | Update a country            |
| `DELETE` | `/api/states/:id`         | Soft delete a country       |

### 🏙️ City Management
| Method   | Endpoint                  | Description                 |
|----------|---------------------------|-----------------------------|
| `GET`    | `/api/cities`             | Get all active cities       |
| `GET`    | `/api/cities/:id`         | Get city by ID              |
| `POST`   | `/api/cities`             | Add a new city              |
| `PUT`    | `/api/cities/:id`         | Update a city               |
| `PATCH`  | `/api/cities/:id/restore` | Restore a deleted city      |
| `DELETE` | `/api/cities/:id`         | Soft delete a city          |

## 🔒 Authentication
- **JWT-based authentication** for securing routes.
- Role-based access control for admin and regular users.

## 🌟 Features
- Dynamic management of countries and cities
- Soft delete for data safety
- JWT authentication with role-based permissions
- Optimized state management with React Query & Recoil


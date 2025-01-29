# 🌍 Country & City Management API

## 📚 Project Overview
This is a **full-stack application** for managing **countries and cities** using **MongoDB, Express.js, and React**.  
Each country contains a list of cities, allowing dynamic management through an API.  
The system supports **soft delete**, meaning countries and cities are never permanently deleted but marked as inactive (`isActive: false`).

## 🚀 Technologies Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, React Query, Recoil, MUI
- **Authentication**: JWT, Express Middleware
- **Data Source**: [REST Countries API](https://restcountries.com/v3.1/all) for fetching country data.

---

## 📚 Project Structure
```yaml
country-management-project
├── server
│   ├── controllers
│   │   ├── stateController.ts
│   │   ├── cityController.ts
│   ├── models
│   │   ├── State.ts
│   │   ├── City.ts
│   ├── routes
│   │   ├── stateRoutes.ts
│   │   ├── cityRoutes.ts
│   ├── services
│   │   ├── stateService.ts
│   │   ├── cityService.ts
│   ├── index.ts
│   ├── database.ts
│   ├── .env
│   ├── package.json
│
├── client
│   ├── src
│   │   ├── components
│   │   │   ├── StateForm.tsx
│   │   │   ├── CityForm.tsx
│   │   ├── pages
│   │   │   ├── ListPage.tsx
│   │   │   ├── CreateStatePage.tsx
│   │   ├── hooks
│   │   │   ├── useStates.ts
│   │   │   ├── useCities.ts
│   │   ├── context
│   │   │   ├── StateContext.tsx
│   │   │   ├── CityContext.tsx
│   ├── public
│   ├── package.json
│   ├── vite.config.ts
│
└── README.md
```

---

## 🔧 Installation & Setup

### 📌 **1. Clone the Repository**
```bash
git clone https://github.com/your-repo/country-management-project.git
cd country-management-project
```

### 📌 **2. Set Up Backend**
```bash
cd server
npm install
```

- **Configure `.env` file:**
```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

- **Run the backend server:**
```bash
npm run dev
```

### 📌 **3. Set Up Frontend**
```bash
cd ../client
npm install
```

- **Run the frontend app:**
```bash
npm run dev
```

- Open the browser at [http://localhost:5173](http://localhost:5173)

---

## 🌍 API Endpoints

### **📌 Country Management**
| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| `GET`  | `/api/states`       | Get all active countries            |
| `GET`  | `/api/states/:id`   | Get a specific country by ID        |
| `POST` | `/api/states`       | Add a new country                   |
| `PATCH` | `/api/states/:id/restore` | Restore a deleted country |
| `PUT`  | `/api/states/:id`   | Update a country                    |
| `DELETE` | `/api/states/:id` | Soft delete a country (`isActive: false`) |

### **🏙️ City Management**
| Method | Endpoint            | Description                          |
|--------|---------------------|--------------------------------------|
| `GET`  | `/api/cities`       | Get all active cities               |
| `GET`  | `/api/cities/:id`   | Get a specific city by ID           |
| `POST` | `/api/cities`       | Add a new city                      |
| `PUT`  | `/api/cities/:id`   | Update a city                       |
| `PATCH` | `/api/cities/:id/restore` | Restore a deleted city  |
| `DELETE` | `/api/cities/:id` | Soft delete a city (`isActive: false`) |

---

## 📌 Adding Cities to Countries
Each **city** is linked to a **country** using `ObjectId`. The country model contains an array of city IDs.

### **Example of a Country Document (`State.ts`)**
```json
{
  "_id": "64e9b1e8a1b2c9f3c4d56789",
  "name": "United States",
  "flag": "https://example.com/usa-flag.svg",
  "population": 331000000,
  "region": "Americas",
  "isActive": true,
  "cities": [
    "64e9b1e8a1b2c9f3c4d56999",
    "64e9b1e8a1b2c9f3c4d56000"
  ]
}
```

### **Example of a City Document (`City.ts`)**
```json
{
  "_id": "64e9b1e8a1b2c9f3c4d56999",
  "name": "New York",
  "state": "64e9b1e8a1b2c9f3c4d56789",
  "population": 8419000,
  "isActive": true
}
```

---

## 🔥 Features
✅ **Fetch and store countries from an external API**  
✅ **Add and manage cities within each country**  
✅ **Soft delete for both countries and cities** (no hard deletion)  
✅ **Efficient database relations (states & cities)**  
✅ **Authentication middleware using JWT**  
✅ **React Query for optimized state management**  

---


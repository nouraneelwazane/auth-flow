# Auth Flow Project

This project consists of a frontend (React + TypeScript) and a backend (NestJS). It provides user authentication with sign-up, sign-in, and protected user data retrieval.

## 📌 Project Structure

```
/auth-flow
├── backend  # NestJS API
├── frontend # React TypeScript App
```

## 🚀 Getting Started

### 🔧 Backend Setup (NestJS)

1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   DB_USER, DB_PASS, DB_HOST, DB_NAME, DB_OPTIONS
   ```
4. Start the backend server:
   ```sh
   npm run start
   ```

### 💻 Frontend Setup (React)

1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `frontend` directory with the following variables:
   ```env
   PORT=3001
   ```
4. Start the frontend application:
   ```sh
   npm start
   ```

## 🌍 API Endpoints

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/users`         | Register a new user |
| POST   | `/auth/signIn`   | Authenticate user   |
| GET    | `/auth/userData` | Get user details    |

## ✅ Features

- User Sign-Up with validation
- User Sign-In with token-based authentication
- Protected route to retrieve user data
- Error handling for network/server issues

## 📜 License

This project is licensed under the MIT License.

---

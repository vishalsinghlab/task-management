````md
# Task Management Application

A role-based task management application built using the MEAN stack (MongoDB, Express.js, Angular, Node.js) with JWT authentication, role-based authorization, realtime updates, and Swagger API documentation.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## Role-Based Authorization

- Manager
- Team Lead
- Employee

## Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Tasks
- Filter Tasks by Status

## Realtime Updates

- Socket.IO integration for live task updates

## API Documentation

- Swagger OpenAPI Documentation
- JWT Authorization Support
- API Testing via Swagger UI

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- Swagger (OpenAPI Documentation)

## Frontend

- Angular
- RxJS
- Angular Reactive Forms
- Tailwind CSS

---

# Project Structure

```txt
backend/
frontend/
```

---

# Backend Setup

## 1. Navigate to Backend

```bash
cd backend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create Environment File

Create a `.env` file inside `backend/`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:4200
```

## 4. Run Backend Server

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## 1. Navigate to Frontend

```bash
cd frontend
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Angular App

```bash
ng serve
```

Frontend will run on:

```txt
http://localhost:4200
```

---

# API Documentation

Swagger API documentation is available at:

```txt
http://localhost:5000/api-docs
```

## Swagger Features

- Authentication APIs
- User APIs
- Task APIs
- Request/Response Schemas
- JWT Authorization Support

## Swagger Setup

Install dependencies:

```bash
npm install swagger-jsdoc swagger-ui-express
```

---

# User Roles

## Manager

- View all users
- Create tasks
- Assign tasks to anyone
- Manage all tasks

## Team Lead

- View team members
- Assign tasks to team members
- Manage team tasks

## Employee

- View assigned tasks
- Update own tasks
- Delete own tasks

---

# Realtime Events

Socket.IO events used:

```txt
taskCreated
taskUpdated
taskDeleted
```

---

# Authentication

JWT token must be sent in headers:

```txt
Authorization: Bearer your_token
```

---

# Available Scripts

## Backend

```bash
npm run dev
npm start
```

## Frontend

```bash
ng serve
ng build
```

---

# Future Improvements

- Pagination
- Search & Sorting
- File Attachments
- Notifications
- Task Comments
- Docker Deployment
- Unit Testing

---

# Author

Vishal Singh
````

# TaskFlow HQ Backend

Backend API for the **TaskFlow HQ** Task Management System built using **Node.js, Express.js, MongoDB, JWT Authentication, Socket.IO, and Swagger OpenAPI**.

Supports:

- Role-Based Access Control (RBAC)
- Realtime task updates
- Team management
- Task assignment workflows
- REST APIs for frontend & external integrations

---

# Features

## Authentication & Authorization

- JWT Authentication
- Secure Password Hashing using bcryptjs
- Protected API Routes
- Role-Based Access Control (RBAC)

### Supported Roles

| Role | Permissions |
|---|---|
| Manager | Full system access |
| Team Lead | Manage team tasks |
| Employee | Manage own tasks |

---

# Task Management Features

- Create Tasks
- Update Tasks
- Delete Tasks
- Assign Tasks
- Task Status Updates
- Task Filtering
- Team-based task visibility

---

# Team Management

Managers can:

- View all users
- Assign employees to team leads
- Manage organization-wide tasks

Team Leads can:

- View their team members
- Assign tasks to their team

---

# Real-Time Updates

Integrated using Socket.IO:

- Live task creation updates
- Live task update synchronization
- Live task deletion updates
- Instant dashboard refresh

---

# API Documentation

Swagger OpenAPI Documentation included.

Features:

- Interactive API testing
- JWT authorization support
- Request/response schemas
- Organized API groups

Swagger URL:

```txt
https://task-management-1l3m.onrender.com/api-docs
```

Local:

```txt
http://localhost:5000/api-docs
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Socket.IO
- Swagger OpenAPI

## Frontend

- Angular 19
- Tailwind CSS
- RxJS
- ngx-toastr

---

# Project Structure

```bash
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── sockets/
├── utils/
├── docs/
├── app.js
└── server.js
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLIENT_URL=http://localhost:4200
```

---

# Installation

## Clone Repository

```bash
git clone <backend-repo-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Development Server

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# API Endpoints

# Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

# Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get tasks |
| POST | /api/tasks | Create task |
| PATCH | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/assign | Assign task |

---

# Users

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/users | Get all users |
| GET | /api/users/team | Get team members |
| PATCH | /api/users/:id/assign-team-lead | Assign employee to lead |

---

# Socket.IO Events

| Event | Description |
|---|---|
| taskCreated | Fired when a task is created |
| taskUpdated | Fired when a task is updated |
| taskDeleted | Fired when a task is deleted |

---

# Authentication Header

Protected routes require:

```txt
Authorization: Bearer your_jwt_token
```

---

# Available Scripts

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

---

# Future Improvements

- Pagination
- Search & Sorting
- Activity Logs
- Notifications
- File Attachments
- Docker Support
- Unit Testing
- Audit Trails
- Rate Limiting
- API Versioning

---

# Deployment

## Backend

Recommended: Render

## Database

MongoDB Atlas

---

# Author

Vishal Singh

- GitHub: https://github.com/vishalsinghlab
- LinkedIn: https://linkedin.com/in/vishal-singh-b57b7b109
- Portfolio: https://singhvishal.vercel.app

---

# Smart Task Management API
### A backend project using Redis caching and Auth 2.O authentication

## 📌 Project Overview
### The Smart Task Management API is a backend RESTful service that allows users to securely manage their tasks.
### The application uses OAuth 2.O (Google Login) for authentication and Redis for caching and performance optimization.
### This project is designed to simulate a real-world production backend, focusing on scalability, security, and clean architecture.

## 🎯 Project Goals
- Implement secure authentication without storing passwords
- Learn Redis caching to improve API performance
- Build a scalable backend architecture
- Understand real-world backend workflows
- Create a project suitable for resumes and interviews

## 🧰 Tech Stack
### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose (ODM)

### Caching & Performance
- Redis

### Other Tools
- dotenv (environment variables)
- Postman (API testing)

## 🧠 Core Concepts Used
- RESTful API design
- OAuth 2.O authentication flow
- JWT-based authorization
- Redis caching & cache invalidation
- Rate limiting (using Redis)
- Middleware-based architecture

## 📦 Core Entities
### User - Represents an authenticated user logged in via Google OAuth.

### Fields:
- id
- name
- email
- provider (google)
- createdAt

### Task - Represents a task created by a user.

### Fields:
- id
- title
- description
- status (pending / completed)
- userId
- createdAt

## 🔐 Authentication Flow (OAuth 2.O)
- 1. User clicks Login with Google
- 2. Google authenticates the user
- 3. Google sends an authorization code to the backend
- 4. Backend exchanges the code for user profile data
- 5. Backend:
        - Create a new user if not existing
        - Generate a JWT

- 6. JWT is used to access protected APIs

## ⚡ Redis Usage

### 1. Caching user task lists
- Reduces database load
- Improves response time

### 2. Rate limiting
- Prevents API abuse
- Limits requests per user/IP

### 3. Session / token metadata (optional enhancement)

## 🔁 Cache Strategy

- ### On GET /tasks
    - Check Redis cache
    - If cache exists → return cached data
    - Else → fetch from DB → store in Redis

- ### On POST / PUT / DELETE
    - Update database
    - Invalidate related Redis cache


## 🛠 API Endpoints (High-Level)

### Authentication
- GET /auth/google – Start Google OAuth
- GET /auth/google/callback – OAuth callback

### Tasks (Protected Routes)
- POST /tasks – Create a task
- GET /tasks – Get user tasks
- PUT /tasks/:id – Update a task
- DELETE /tasks/:id – Delete a task

## 📁 Planned Folder Structure
```
src/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── middleware/
 ├── models/
 ├── config/
 ├── utils/
 └── app.js
```

## 🚧 Potential Challenges
- Redis cache invalidation
- OAuth redirect & token handling
- JWT expiration management
- Handling Redis downtime gracefully
- Keeping API responses consistent

## 📈 Future Enhancements

- Refresh token implementation
- Role-based access control
- Task analytics
- Background jobs using Redis
- Dockerized deployment

## 👨‍💻 Learning Outcome

### By completing this project, you will gain hands-on experience with:
- Modern authentication systems
- High-performance backend design
- Production-style caching strategies
- Clean backend architecture
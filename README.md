# Jwt-Auth

A secure JWT (JSON Web Token) authentication system built with **Node.js**, **Express.js**, and **JWT**. This project demonstrates modern authentication practices including user registration, login, protected routes, and token-based authorization.

---

## 🚀 Features

* User Registration
* User Login
* Password Hashing using **bcrypt**
* JWT Access Token Generation
* Protected Routes using Authentication Middleware
* Secure Password Storage
* Error Handling
* Environment Variables Support

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* JSON Web Token (JWT)
* bcrypt
* PostgreSQL
* dotenv

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Arina8111/Jwt-Auth.git
```

Navigate into the project

```bash
cd Jwt-Auth
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
```

Start the server

```bash
npm start
```

For development

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Register

```http
POST /register
```

Request Body

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Login

```http
POST /login
```

Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response

```json
{
  "token": "your_jwt_token"
}
```

---

### Protected Route

```http
GET /protected
```

Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

---





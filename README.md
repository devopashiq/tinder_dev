# Namaste Node.js – Tinder Dev Backend 🚀

A **full-stack web application** built while learning **Node.js** through **Namaste Node.js by Akshay Saini**.

This project is inspired by a **Tinder-like developer matching platform**, where developers can discover, connect, and interact with each other.

The application includes:
- A **React-based frontend** for user interaction
- A **Node.js + Express backend** for APIs and business logic
- A **MongoDB database** for persistent storage

This project focuses on **real-world full-stack architecture**, clean APIs, authentication, and scalable design

---

## 🧠 What I Learned from This Project



Key learnings:
- How Node.js actually works (event loop, async I/O)
- How Express handles requests and middleware
- Designing REST APIs properly
- Authentication & authorization
- Database schema design
- Writing clean, maintainable backend code

---

## 🛠 Tech Stack

### Frontend
- **React.js** – UI library
- **Vite / CRA** – Build tool
- **Redux / Context API** – State management
- **Axios / Fetch** – API communication
- **CSS / Tailwind** – Styling

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database
- **Mongoose** – ODM for MongoDB
- **JWT** – Authentication
- **bcrypt** – Password hashing

### Tools
- **Postman** – API testing
- **Git & GitHub** – Version control

---


---

## 🔐 Authentication Flow

- User registers with email & password
- Password is hashed using **bcrypt**
- JWT token is generated on login
- Protected routes are secured using **JWT middleware**

No shortcuts. This follows real industry standards.

---

## 🧩 Core Features

### 👤 User
- Sign up & login (frontend + backend)
- JWT-based authentication
- View & edit developer profile
- Set and update **age**, bio, and profile image

### 💘 Match System
- Browse developers via **Feed Page**
- Send connection requests
- View incoming & outgoing requests
- Accept / Reject requests
- Prevent duplicate or invalid requests

### 💬 Chat
- One-to-one chat after mutual connection
- Messages persisted in database
- Access restricted to connected users only

### 🔄 Frontend–Backend Integration
- REST API consumption from React
- Centralized auth handling
- Protected routes on both frontend & backend

### 🛡 Security
- Password hashing with bcrypt
- Token-based authentication
- Protected API routes

---

## 🌱 Environment Variables

Create a `.env` file in the root directory:


DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## ▶️ How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/tinder-dev-fullstack.git

'''


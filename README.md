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

Create a `.env` file in the **root directory**:

```env
DB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_secret_key

```

## 📸 Screenshots

| Feature                | Screenshot                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Home Page**          | <img width="700" alt="Home Page" src="https://github.com/user-attachments/assets/e736798f-156e-47d6-84d5-3584a7a52d5c" />          |
| **Login** | <img width="700" alt="Campground Details" src="https://github.com/user-attachments/assets/78303bd1-d4e8-4042-87b7-7cfadb830cdd" /> |
| **Sign Up**     | <img width="700" alt="Add Campground" src="https://github.com/user-attachments/assets/024a73e3-bdc3-49b7-b344-b95a657b650f" />     |
| **Request Page**    | <img width="700" alt="Map Integration" src="https://github.com/user-attachments/assets/84649f54-caf2-43d7-a7bc-21327d40ba19" />    |
| **Connection Page**         | <img width="700" alt="Login Page" src="https://github.com/user-attachments/assets/dc7703ea-4a71-4eb4-a9f5-811ae9444574" />         |
| **Chat  Page**         | <img width="700" alt="Login Page" src="https://github.com/user-attachments/assets/dc7703ea-4a71-4eb4-a9f5-811ae9444574" />         |

---



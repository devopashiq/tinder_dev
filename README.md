Namaste Node.js – Tinder Dev Backend 🚀

A full-stack web application built while learning Node.js through Namaste Node.js by Akshay Saini.

This project is inspired by a Tinder-like developer matching platform, where developers can discover, connect, and interact with each other.

The application includes:

A React-based frontend for user interaction

A Node.js + Express backend for APIs and business logic

A MongoDB database for persistent storage

This project focuses on real-world full-stack architecture, clean APIs, authentication, and scalable design — not just UI screenshots.

🧠 What I Learned from This Project

This project is not about building a toy app. It is about understanding how real backend systems work.

Key learnings:

How Node.js actually works (event loop, async I/O)

How Express handles requests and middleware

Designing REST APIs properly

Authentication & authorization

Database schema design

Writing clean, maintainable backend code

🛠 Tech Stack

Frontend

React.js – UI library

Vite / CRA – Build tool

Redux / Context API – State management

Axios / Fetch – API communication

CSS / Tailwind – Styling

Backend

Node.js – Runtime environment

Express.js – Web framework

MongoDB – Database

Mongoose – ODM for MongoDB

JWT – Authentication

bcrypt – Password hashing

Tools

Postman – API testing

Git & GitHub – Version control

📂 Project Structure

├── src
│   ├── config        # DB & environment configuration
│   ├── models        # Mongoose schemas
│   ├── routes        # API routes
│   ├── controllers   # Business logic
│   ├── middlewares   # Auth & error handling
│   └── utils         # Helper functions
│
├── app.js            # Express app setup
├── server.js         # Server entry point
├── package.json
└── README.md

🔐 Authentication Flow

User registers with email & password

Password is hashed using bcrypt

JWT token is generated on login

Protected routes are secured using JWT middleware

No shortcuts. This follows real industry standards.

🧩 Core Features

👤 User

Sign up & login (frontend + backend)

JWT-based authentication

View & edit developer profile

💘 Match System

Browse developer profiles

Send connection requests

Accept / Reject requests

Prevent duplicate or invalid requests

🔄 Frontend–Backend Integration

REST API consumption from React

Centralized auth handling

Protected routes on both frontend & backend

🛡 Security

Password hashing with bcrypt

Token-based authentication

Protected API routes

🌱 Environment Variables

Create a .env file in the root directory:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ How to Run Locally

1️⃣ Clone the repository

git clone https://github.com/your-username/tinder-dev-fullstack.git

2️⃣ Backend Setup

cd backend
npm install
npm run dev

3️⃣ Frontend Setup

cd frontend
npm install
npm run dev

4️⃣ Open the app

Frontend runs on http://localhost:5173

Backend runs on http://localhost:3000

Use Postman to test APIs independently if needed.

📖 Course Reference

This project is built by following concepts taught in:

Namaste Node.js by Akshay SainiA course focused on deep backend fundamentals, not just frameworks.

🎯 Why This Project Matters

Most beginners build CRUD apps.
This project goes deeper:

Proper backend layering

Real authentication logic

Scalable API structure

This is a learning-first project, not a copy-paste tutorial app.

📌 Future Improvements

Pagination & filters

Rate limiting

Role-based access control

Deployment (AWS / Render)

👨‍💻 Author

Mohammed Ashiq PAspiring Software Engineer | Backend & Full‑Stack Developer

⭐ If you find this project useful, give it a star and follow my learning journey.


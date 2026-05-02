<div align="center">
  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Parishram Banner" width="100%" style="border-radius: 12px; margin-bottom: 20px;" />

  # 🎓 Parishram - Premium EdTech Platform
  
  **A scalable, modern, and comprehensive e-learning management system.**

  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)

  [View Live Demo](#) • [Report Bug](#) • [Request Feature](#)
</div>

---

## 📖 Table of Contents
1. [About The Project](#about-the-project)
2. [Key Features](#key-features)
3. [Tech Stack & Architecture](#tech-stack--architecture)
4. [Folder Structure](#folder-structure)
5. [Getting Started (Installation)](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Demo Login Credentials](#demo-credentials)
8. [API Documentation Overview](#api-documentation-overview)

---

## 🚀 About The Project

Parishram is a full-stack educational technology platform designed to bridge the gap between traditional coaching and modern e-learning. It provides a robust architecture capable of handling role-based routing (Admin, Teacher, Student), automated online examinations (NTA-style mock tests), and detailed student performance analytics. 

The UI/UX is heavily inspired by modern SaaS platforms, utilizing a **glassmorphism design language**, smooth micro-interactions, and a dedicated mobile-first bottom navigation system.

---

## ✨ Key Features

### 👨‍🎓 For Students
- **Course Library:** Browse, enroll, and consume course materials (Video lectures and PDF notes).
- **Mock Test Engine:** Time-bound, strict-format online exams mimicking real competitive exams (JEE/NEET).
- **Performance Analytics:** Visual representations (via Recharts) of test history, score progression, and accuracy.
- **Secure Profile:** OTP-based password resets and secure profile management.

### 👨‍🏫 For Teachers
- **Course Management:** Create and structure courses with nested modules.
- **Test Creation:** Build dynamic MCQ tests with custom marking schemes (positive/negative marking).
- **Student Monitoring:** Track the performance of enrolled students.

### 🛡️ For Admins
- **User Management:** Oversee all platform users, ban/unban accounts, and assign roles.
- **Platform Analytics:** Global view of platform revenue, total enrollments, and active courses.

---

## 🛠️ Tech Stack & Architecture

Parishram follows a strict **MERN (MongoDB, Express, React, Node.js)** stack architecture.

**Frontend Layer:**
- **React.js (Vite):** High-performance UI rendering.
- **Redux Toolkit:** Centralized state management for Auth, Courses, and Tests.
- **Tailwind CSS:** Utility-first CSS for rapid, responsive UI development.
- **Recharts:** For rendering complex student performance data visually.

**Backend Layer:**
- **Node.js & Express.js:** RESTful API creation.
- **MongoDB & Mongoose:** NoSQL database modeling with relationships (User -> Course -> Test -> Attempt).
- **JWT & Bcrypt.js:** Stateless, secure authentication and password hashing.

---

## 📂 Folder Structure

```text
parishram/
├── backend/                  # Express server
│   ├── controllers/          # Request handlers (auth, user, course, test)
│   ├── middleware/           # JWT verification, Role authorization
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoint definitions
│   └── server.js             # Entry point
│
└── frontend/                 # React application
    ├── src/
    │   ├── components/       # Reusable UI components (Sidebar, Navbar, Modals)
    │   ├── features/         # Redux slices (authSlice, courseSlice)
    │   ├── pages/            # View components (Dashboard, Analytics, TestPlayer)
    │   ├── services/         # Axios API interceptors
    │   └── index.css         # Global Tailwind directives & custom animations
```

---

## 🚦 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v16.0.0 or higher)
- MongoDB (Local instance or MongoDB Atlas cluster)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Purnansh29/parishram.git
   cd parishram
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   *Create a `.env` file (refer to the Environment Variables section below).*
   ```bash
   npm run dev    # Runs server on port 5000 using nodemon
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   npm run dev    # Runs React app on port 5173
   ```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Backend server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/parishram` |
| `JWT_SECRET` | Secret key for signing tokens | `your_super_secret_jwt_key_here` |
| `NODE_ENV` | Environment state | `development` |

---

## 🧪 Demo Credentials

To evaluate the platform without registering, you can use the following pre-configured accounts (if you have run the database seeder):

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` | Full platform control, User management |
| **Teacher** | `teacher@gmail.com` | `admin123` | Course & Test creation, Content management |
| **Student** | `student@gmail.com` | `admin123` | Course consumption, Taking tests, Analytics |

*(To seed your database with these accounts, run `npm run seed` inside the backend directory, assuming you have a seeder script set up).*

---

## 🌐 API Documentation Overview

The backend exposes a RESTful API. All protected routes require a valid `Bearer Token` in the Authorization header.

- **Auth:** `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/forgot-password`
- **Users:** `GET /api/users/profile`, `PUT /api/users/change-password`
- **Courses:** `GET /api/courses`, `POST /api/courses` (Teacher only), `POST /api/courses/:id/enroll`
- **Tests:** `GET /api/tests`, `POST /api/tests/:id/submit`, `GET /api/tests/attempts`

---

## 📱 Responsiveness & Accessibility
The frontend is heavily optimized for mobile devices. It features CSS media queries that transform the desktop sidebar into an **iOS-style bottom navigation bar** on small screens, ensuring the core learning experience is never compromised on smartphones.

---

<div align="center">
  <b>Built with ❤️ by Purnansh Patel</b>
</div>

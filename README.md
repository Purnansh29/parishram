# Parishram - Premium EdTech Platform

![Parishram Platform](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## 🎓 Overview
Parishram is a modern, responsive, and full-featured EdTech platform designed for seamless online learning. Built with the MERN stack, it offers an intuitive learning experience with courses, mock tests, performance analytics, and role-based access control (Admin, Teacher, Student).

## ✨ Key Features
- **Role-Based Dashboards**: Distinct interfaces and capabilities for Admins, Teachers, and Students.
- **Course Management**: Teachers can create, organize, and upload modules (Video/PDF) for courses.
- **Mock Test Engine**: Complete NTA-style online exam interface with timers, marking schemes, and immediate evaluation.
- **Performance Analytics**: Visual data representations (Recharts) of student test history, accuracy, and average scores.
- **Responsive Design**: Beautiful "glassmorphism" UI with dark mode support and a dedicated mobile bottom navigation bar.
- **Security**: JWT authentication, hashed passwords, and OTP-based password reset flows.

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS, Redux Toolkit, React Router DOM, Recharts, Vite
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

## 🚀 Quick Start / Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be accessible at `http://localhost:5173`.

## 🧪 Demo Login Credentials
To easily test the application's role-based architecture, you can use the following default credentials (make sure to register them first if your DB is empty):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@gmail.com` | `admin123` |
| **Teacher** | `teacher@gmail.com` | `admin123` |
| **Student** | `student@gmail.com` | `admin123` |

## 📱 Mobile Support
Parishram features a highly polished mobile experience. To view it, open Developer Tools in your browser (F12) and switch to device toolbar, or open the local IP address on your smartphone. The mobile view includes an iOS-style bottom navigation bar and slide-out drawers.

## 🤝 About
This project was developed to showcase advanced MERN stack architecture, premium UI/UX design (inspired by modern SaaS platforms), complex Redux state management, and robust backend logic for an educational context.

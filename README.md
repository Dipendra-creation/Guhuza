# Guhuza Game

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Database Setup](#4-database-setup)
  - [5. Running the Application](#5-running-the-application)
- [Deployment](#deployment)
- [Known Issues](#known-issues)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Introduction
Guhuza is a gaming cooperative platform designed to offer interactive and engaging quiz-based games. The project utilizes a scalable, responsive, and high-performance architecture that ensures seamless gameplay while tracking user progress and scores.

---

## Features
- **User Authentication:** Secure login and signup with JWT authentication.
- **Quiz Gameplay:** Multi-level quiz system with real-time score updates.
- **Progress Tracking:** Stores user scores, correct/wrong answers, and highest level completed.
- **Leaderboard:** Displays top-performing users.
- **Profile Management:** Users can update profile pictures, track scores, and badges.
- **Social Sharing:** Capture and share achievements on social media.
- **Mobile-Responsive UI:** Fully optimized for different screen sizes.

---

## Tech Stack
### **Frontend:**
- React.js (Vite)
- TypeScript
- Tailwind CSS
- React Hook Form
- Framer Motion (Animations)
- React Router DOM (Navigation)
- Axios (HTTP requests)
- HTML2Canvas (Image Capturing)

### **Backend:**
- Node.js
- Express.js
- Prisma ORM
- MySQL Database
- Bcrypt (Password Hashing)
- JSON Web Tokens (JWT) for authentication
- Multer (File Uploads)

### **Deployment & Dev Tools:**
- PM2 (Process Manager for Node.js)
- DigitalOcean / AWS (Hosting)
- Vercel (Frontend Deployment)
- MySQL Database (Managed Cloud Instance)
- GitHub Actions (CI/CD)

---

## Installation & Setup

### **1. Clone the Repository**
```sh
# Using HTTPS
git clone https://github.com/yourusername/guhuza.git

# Using SSH
git clone git@github.com:yourusername/guhuza.git
```
```sh
cd guhuza
```

### **2. Install Dependencies**
```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the `backend` directory and add the following:
```sh
DATABASE_URL=mysql://user:password@localhost:3306/guhuza
JWT_SECRET=your_secret_key
UPLOADS_DIR=uploads/
```

### **4. Database Setup**
```sh
# Run Prisma migrations
docker-compose up -d (if using docker)
npx prisma migrate dev --name init
npx prisma generate
```

### **5. Running the Application**
#### **Start the Backend Server**
```sh
cd backend
npm run dev
```
#### **Start the Frontend**
```sh
cd frontend
npm run dev
```

---

## Deployment
The Guhuza platform is deployed in a **staging environment** before production. The deployment process involves:

1. **Server Setup:** Configuring a cloud instance (e.g., DigitalOcean, AWS) with Node.js and MySQL.
2. **Dependency Installation:** Ensuring all required dependencies are installed on the server.
3. **Database Configuration:** Running migrations and seeding initial data.
4. **Application Deployment:** Uploading backend and frontend builds.
5. **Monitoring & Debugging:** Performance tracking and logging errors using PM2.
6. **CI/CD:** Automating deployments with GitHub Actions.

---

## Known Issues
- **Profile Picture Not Updating:** Ensure that the `/uploads` directory has the correct read/write permissions.
- **Score Not Updating in Real-time:** Refreshing may be required due to caching mechanisms.
- **Locked Levels Not Unlocking:** Ensure `highestLevelCompleted` updates correctly in the database.
- **Slow API Responses:** Optimize database queries and indexing.

---

## Future Improvements
- **WebSocket Integration:** Real-time leaderboard and notifications.
- **Multiplayer Mode:** Add live quizzes with multiple participants.
- **AI-Powered Questions:** Generate personalized quizzes using AI.
- **Dark Mode:** Provide a theme toggle for user preference.
- **Native Mobile App:** Extend functionality to iOS and Android devices.

---

## License
This project is licensed under the MIT License.


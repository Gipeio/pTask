# Ptask

## Overview

This Task Manager Application is a full-stack project built with React for the frontend and Node.js, Express, and MongoDB for the backend. The application allows users to register, log in, create, edit, delete, and organize tasks by project or category. Users can also mark tasks as completed and filter tasks by status.

# Features

    User Authentication (Registration, Login, Logout)
    Task Management (Create, Edit, Delete Tasks)
    Organize Tasks by Project or Category
    Filter and Search Tasks by Status
    Responsive and Intuitive User Interface

# Tech Stack

    Frontend: React, Redux, Material-UI
    Backend: Node.js, Express, MongoDB, JWT for authentication

# Installation

Follow these steps to set up and run the project locally:
Prerequisites

    Node.js and npm installed on your machine
    MongoDB installed and running

# Clone the Repository

```bash
git clone https://github.com/Gipeio/pTask.git
cd ptask
```

# Setup Frontend

    Navigate to the frontend directory and install dependencies:

```bash
npm install
```

# Start the frontend development server:

```bash
npm start
```

# Setup Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

# Create a .env file in the backend directory and add your MongoDB URI and JWT secret:

env

MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret

# Start the backend server:

```bash
npm start
```

# Project Structure

The project structure is organized as follows:

```bash
task-manager/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └──
```
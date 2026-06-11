# 🚀 Smart Task Manager

A robust, full-stack task management application with **Role-Based Access Control (RBAC)**. Built with React, TypeScript, Tailwind CSS, Redux Toolkit, and Node.js.

## 📖 Overview

Smart Task Manager empowers teams and individuals to track tasks seamlessly. It features a secure, role-based architecture:
*   **Admins** have a comprehensive dashboard to monitor overall system progress, view all tasks globally, analyze status distributions, and manage registered users.
*   **Users** get a personalized portal to create, edit, track, and delete their own tasks with deadline management and live status tracking.

## ✨ Features

- **🔐 Role-Based Access Control (RBAC)**: Secure authentication and authorization strictly separating `Admin` and `User` privileges.
- **📊 Admin Analytics Dashboard**: Visual summaries of total tasks, user distribution, and task statuses (Pending, In Progress, Completed).
- **✅ Task Management**: Complete CRUD operations for user tasks with intuitive UI cards.
- **👥 User Management**: Admins can view and safely remove users from the system (with built-in self-deletion protection).
- **🎨 Modern Responsive UI**: Beautiful, single-screen layouts built with Tailwind CSS, featuring reusable modals, toast notifications, and interactive forms.
- **🛡️ Secure Routes**: Protected frontend routes that automatically check for JWT tokens and role clearance before rendering.

## 🛠️ Tech Stack

**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- Redux Toolkit (State Management & Async Thunks)
- React Router DOM (Routing & Protection)
- Formik & Yup (Form handling and validation)
- Lucide React (Icons)
- React Hot Toast (Notifications)

**Backend (Implied):**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for Authentication

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
*   Node.js (v16 or higher)
*   npm or yarn
*   Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/smart-task-manager.git
   cd smart-task-manager
   ```

2. **Install Dependencies**
   ```bash
   # Install all required npm packages
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root of your project and add the necessary configuration. Example:
   ```env
   # Frontend API target
   VITE_API_BASE_URL=http://localhost:3000/api

   # Backend Setup
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Open the Application**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🗂️ Project Structure (Frontend)

```text
src/
├── apps/frontend/                 
│   ├── components/                # Reusable, stateless UI components (Buttons, Modals, Inputs, Cards)
│   ├── constants/                 # Static configurations (e.g., Navbar structures, Route enums)
│   ├── pages/                     # Feature-based page modules
│   │   ├── admin-dashboard/       # Admin-only views (User Management, Global Tasks)
│   │   ├── dashboard/             # Protected User Portal (Home, Personal Tasks, Task Creation)
│   │   └── landing-page/          # Public marketing page & Authentication modals
│   ├── redux/                     # Redux Toolkit store, async thunks, and state slices
│   ├── routes/                    # Route definitions and RBAC protection wrappers
│   ├── services/                  # Axios/Fetch services for backend API communication
│   └── types/                     # Shared TypeScript interfaces and enums
├── main.tsx                       # React application entry point & Global Providers
└── index.css                      # Tailwind directives and global stylesheets
```

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome!

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📝 License

Distributed under the MIT License.
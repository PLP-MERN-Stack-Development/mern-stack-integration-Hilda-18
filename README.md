# Blogpost

A modern, responsive web application built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and **ShadCN/UI**. FlowFinder Kenya helps users explore, search, and navigate points of interest across Kenya.

---

## 🚀 Project Overview

FlowFinder Kenya provides a smooth and visually appealing interface for discovering locations and services across Kenya. Users can search, filter, and navigate easily, all while enjoying a responsive and modern UI.

**Key Features:**

- Interactive search and filtering for locations
- Responsive design for mobile, tablet, and desktop
- Reusable components with ShadCN/UI
- State management using React hooks and Context API
- Fully typed codebase using TypeScript

---

## 📂 Project Structure

Blogpost/
├── public/ # Static files (images, icons, favicon)
├── src/ # React source code
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility libraries and functions
│ ├── pages/ # Page components
│ ├── App.tsx # Main application component
│ ├── main.tsx # Entry point for React
│ ├── index.css # Global styles
│ └── vite-env.d.ts # TypeScript environment definitions
├── package.json # Project metadata and dependencies
├── vite.config.ts # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
├── tsconfig.app.json # TS config for app
├── tsconfig.node.json # TS config for Node environment
├── README.md # Project documentation
└── bun.lockb # Bun package lock (if using Bun)


---

## ⚡ Features Implemented

- **Search & Filter**: Users can search locations and filter results dynamically.  
- **Responsive UI**: Works on mobile, tablet, and desktop.  
- **Reusable Components**: Built with ShadCN/UI components and TailwindCSS for fast UI development.  
- **Custom Hooks**: Manage API calls and state efficiently.  
- **Type Safety**: TypeScript ensures fewer runtime errors and better developer experience.

---

## 🛠 Technologies Used

- **Frontend**: React, TypeScript, Vite  
- **Styling**: TailwindCSS, ShadCN/UI  
- **State Management**: React hooks and context API  
- **Build Tools**: Vite  
- **Package Manager**: Bun (or npm/yarn)  

---

## 📦 Installation & Setup

### **Option 1: Using Bun**
```bash
# Navigate to project root
cd flowfinder-kenya

# Install dependencies
bun install

# Start development server
bun dev

Option 2: Using npm
# Navigate to project root
cd flowfinder-kenya

# Remove Bun lock file (optional if switching from Bun)
del bun.lockb

# Install dependencies
npm install

# Start development server
npm run dev


Open your browser and go to:

http://localhost:8000







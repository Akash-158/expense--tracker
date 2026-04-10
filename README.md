# Expense Tracker

A modern full-stack web application designed to help users track their personal finances. Users can log their incomes and expenses, view visually appealing charts summarizing their financial health, and manage their money effectively.

## Features

- **User Authentication**: Secure signup and login using JWT (JSON Web Tokens).
- **Dashboard**: A comprehensive overview of total income, total expenses, and current balance.
- **Visualizations**: Interactive charts to analyze income and expense trends over time.
- **Income & Expense Logs**: Seamlessly add, view, and delete income and expense records.
- **Responsive Design**: A sleek, beautifully crafted user interface built with Tailwind CSS that works well on all screen sizes.

## Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS (v4), Recharts (for charts), React Router DOM (for navigation).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (via Mongoose), utilizing `mongodb-memory-server` for temporary development data or connected to a live cluster.
- **Authentication**: bcryptjs (password hashing), jsonwebtoken (secure session management).

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Akash-158/expense--tracker.git
   cd expense--tracker
   ```

2. Install the backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install the frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

This is a full-stack application, which means you need to run both the backend server and the frontend development server simultaneously.

**Start the Backend Server (Terminal 1)**:
```bash
cd backend
npm run dev
# OR
node server.js
```
The server will start on port 5000 (e.g., `http://localhost:5000`).

**Start the Frontend Server (Terminal 2)**:
```bash
cd frontend
npm run dev
```
The frontend will typically run on port 5173 (e.g., `http://localhost:5173`).

---

*Built with passion to help you take control of your finances!*

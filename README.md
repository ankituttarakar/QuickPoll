# 🚀 QuickPoll Project Setup

This guide provides the complete installation instructions for setting up the QuickPoll project on a new machine.

The project is split into two folders: `backend/` (the Node.js server) and `frontend/` (the React app). You must run `npm install` in **both** folders.

---

## 1. ⚙️ Backend Setup

These commands must be run inside the `backend/` folder.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install all dependencies:**
    This command reads the `package.json` file and installs everything needed for the server.
    ```bash
    npm install
    ```
    *(This installs `express`, `mongoose`, `cors`, `dotenv`, `jsonwebtoken`, `bcryptjs`, and `nodemon`.)*

3.  **Create Environment File:**
    You must create a `.env` file in the `backend/` folder. This file holds your secret keys and database connection string.

    ```.env
    MONGO_URI=your_mongodb_connection_string_here
    JWT_SECRET=your_own_long_random_secret_key_here
    ```

4.  **Run the Backend Server:**
    ```bash
    npm run dev
    ```
    The server should now be running on `http://localhost:5000`.

---

## 2. 🖥️ Frontend Setup

These commands must be run from a **new terminal** inside the `frontend/` folder.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install all dependencies:**
    This command reads the `package.json` file and installs everything needed for the React app.
    ```bash
    npm install
    ```
    *(This installs `react`, `react-dom`, `react-router-dom`, `axios`, `jwt-decode`, `react-datepicker`, `tailwindcss`, etc.)*

3.  **Run the Frontend App:**
    ```bash
    npm run dev
    ```
    The app should now be running on `http://localhost:5173`.

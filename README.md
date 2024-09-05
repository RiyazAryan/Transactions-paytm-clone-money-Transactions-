
## Build a basic version of PayTM

## Installation Instructions

### 1. Move Code to a Specific Folder
- Clone or move the project code to a desired directory on your system.

### 2. Install Dependencies
- Open your terminal and navigate to the project root folder.
- Run `npm install` to install all dependencies.
- If installation fails, try the following:
  - Navigate to the `backend` directory by running `cd backend` and then run `npm install`.
  - Similarly, navigate to the `frontend` directory by running `cd frontend` and then run `npm install`.

### 3. Set Up MongoDB
- Add your MongoDB URL to the `.env` file in the `backend` directory.
- Set the `MONGO_URL` variable to your MongoDB connection string.

### 4. Start Backend Server
- In the `backend` directory, run `npm start`.
- This will start the backend server with Nodemon (which automatically restarts the server when file changes are detected).

### 5. Start Frontend Server
- In the `frontend` directory, run `npm run dev`.
- This will start the frontend development server.
- After running this command, you will see two links:
  - One link for accessing the application on a desktop or laptop.
  - Another link for accessing the application on a mobile device connected to the same network.

### 6. Access the Application
- Once both the backend and frontend servers are running, open the provided link in your browser to start using the application.

## Application Usage

### Sign In
- **Required fields:** Username, First Name, Password.
- **Optional field:** Last Name.
- The sign-in form is located in the `signin.jsx` file.

### Post-Sign In Experience
- After signing in, your first name will appear on the top navigation bar (which is located in `appbar.jsx`).
- Your account balance will be displayed on the screen.
- You will also see a list of other users with a search bar to filter the list by name.

### Transactions
- Each user in the list has a "Send" button next to their name. Clicking on this button will take you to the transaction page.
- You can send money to other users by following the instructions on the transaction page.

## Notes
- This project uses **only state management and local storage**.
- **Recoil** is **not** used in this project.

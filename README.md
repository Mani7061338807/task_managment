## Task Management App

### Overview

The Task Management App is a web application designed to help users manage their tasks efficiently. It features user authentication, a personal task board, and robust task management capabilities. The board includes four columns: "To-Do", "In Progress", "Under Review", and "Completed," allowing users to organize their tasks based on their status.

### Features

- **User Authentication**

  - **Signup and Login**: Users can create an account and log in using their email and password.
  - **Secure Password Storage**: Passwords are stored securely.
  - **Session Management**: User sessions are managed to ensure privacy and security.

- **Task Board**

  - **Personal Task Board**: Users access their own task board after logging in.
  - **Columns**: The board includes four columns:
    - **To-Do**
    - **In Progress**
    - **Under Review**
    - **Completed**

- **Task Management**

  - **Create New Tasks**: Users can add tasks to any column.
  - **Task Details**:
    - **Title**: Required field for identifying tasks.
    - **Description**: Optional field for additional task information.
    - **Status**: Required field, auto-filled based on the column where the task is created.
    - **Priority**: Optional field with values:
      - Low
      - Medium
      - Urgent
    - **Deadline**: Optional field to set a due date.
  - **Edit and Delete Tasks**: Users can modify or remove tasks after creation.

- **Drag and Drop Functionality**
  - **Drag and Drop**: Allows users to move tasks between columns.
  - **Automatic Status Update**: The task’s status is updated automatically based on the column it is moved to.

### Installation

To set up the project locally, follow these steps:

#### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. \*\* Install dependencies \*\*

   ```bash
   npm install
   ```

3. Set up environment variables
   MONGO_URI=<your-mongo-uri>
   PORT=3001
   JWT_SECRET=your secret key

4. Start the backend server
   ```bash
   node index.js
   ```

### Frontend Setup

To set up the frontend of the Task Management App, follow these steps:

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend

   ```

2. \*\* Install dependencies \*\*

   ```bash
   npm install
   ```

3. Set up environment variables
   NEXT_PUBLIC_API_URL=http://localhost:3001

4. start the server

```bash
npm run dev
```

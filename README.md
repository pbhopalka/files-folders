# Files-Folder App

## Overview

Files-Folder App is a web application that allows users to manage files and folders with real-time updates. This README will guide you on how to run the backend and frontend code, as well as provide an overview of the app's functionalities.

## Functionalities

- **File and Folder Management**: Users can create, delete, and move files and folders.
- **Real-time Updates**: The app supports real-time updates using WebSockets. This means any update from one user is available to the other.
- **Drag and Drop**: Users can drag and drop files and folders to organize them. (This may not work properly currently)

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Backend Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/pbhopalka/files-folders.git
    cd files-folder-app/backend
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Start the backend server**:

    ```sh
    npm run dev
    ```

## Frontend Setup

1. **Navigate to the frontend directory**:

    ```sh
    cd ../frontend
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Start the frontend server**:

    ```sh
    npm start
    ```

## Running the Application

1. **Start the backend server**:

    ```sh
    cd backend
    npm run dev
    ```

2. **Start the frontend server**:

    ```sh
    cd ../frontend
    npm start
    ```

3. **Access the application**:

    Open your web browser and navigate to `http://localhost:3000`.

## Conclusion

You should now have the Files-Folder App running locally.
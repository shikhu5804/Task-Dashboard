# Task Management Dashboard

A modern, mobile-responsive Task Management Dashboard built with React, Redux Toolkit, and Tailwind CSS.

## Features

- **Task Management**: Add, edit, delete, and toggle completion status of tasks.
- **Filtering & Search**: Filter tasks by status (All, Pending, Completed) and search by title.
- **Persistence**: Tasks and theme preference are saved to `localStorage` to persist across reloads.
- **Dark Mode**: Fully supported light and dark themes with a toggle switch.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Mock API**: Simulates an asynchronous backend with network delays.

## Technology Stack

- **Framework**: React (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Setup & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

- `src/api`: Mock API service.
- `src/app`: Redux store configuration.
- `src/components`: Reusable UI components (TaskItem, FilterBar, etc.).
- `src/features`: Redux slices (logic for tasks).

## Design Choices

- **Redux Toolkit**: Used for global state management to handle tasks and filters efficiently.
- **Tailwind CSS**: Chosen for rapidly building a custom, responsive design without leaving the HTML.
- **LocalStorage**: Used to simulate a database for data persistence.
- **Component Composition**: Broken down into small, focused components for maintainability.

## Notes

- The API is simulated using `setTimeout` to mimic network latency (800ms).
- Form validation is implemented for required fields.

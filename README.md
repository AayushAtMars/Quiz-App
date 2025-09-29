# Quiz App

A simple and interactive quiz application built with React, Vite, and TailwindCSS. This app allows users to select a topic, answer multiple-choice questions, and view their results.

## Features

- User authentication with name, email, and admission number.
- Dynamic multiple-choice questions generated using the Gemini API.
- Timer-based quiz with auto-skip functionality.
- Real-time score calculation and detailed results page.
- Responsive design with TailwindCSS.
- Smooth animations using Framer Motion.
- Toast notifications for user feedback.

## Tech Stack

- **Frontend**: React, React Router, TailwindCSS
- **Backend**: Gemini API for question generation
- **Build Tool**: Vite
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Notifications**: React Toastify

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/quiz-app.git
   cd quiz-app

2. Install dependencies:
   npm install

3. Create a .env file in the root directory and add your Gemini API key:
   Create a .env file in the root directory and add your Gemini API key:

4. Start the development server:
    npm run dev

5. Open the app in your browser at http://localhost:5173.

Scripts
npm run dev: Start the development server.
npm run build: Build the app for production.
npm run preview: Preview the production build.
npm run lint: Run ESLint to check for code issues.

Quiz-App/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable components
│   ├── context/          # Context API for state management
│   ├── pages/            # Page components (Home, Quiz, Result)
│   ├── utils/            # Utility functions (e.g., API calls)
│   ├── [App.jsx](http://_vscodecontentref_/0)           # Main app component
│   ├── [main.jsx](http://_vscodecontentref_/1)          # Entry point
│   ├── [index.css](http://_vscodecontentref_/2)         # Global styles
├── .env                  # Environment variables
├── [package.json](http://_vscodecontentref_/3)          # Project metadata and dependencies
├── [tailwind.config.js](http://_vscodecontentref_/4)    # TailwindCSS configuration
├── [vite.config.js](http://_vscodecontentref_/5)        # Vite configuration
└── [README.md](http://_vscodecontentref_/6)             # Project documentation

API Integration
The app uses the Gemini API to dynamically generate multiple-choice questions. Ensure you have a valid API key and add it to the .env file.

Acknowledgments
React
Vite
TailwindCSS
Framer Motion
React Toastify
Google Gemini API

Demo Link https://quiz-app-six-ochre.vercel.app/

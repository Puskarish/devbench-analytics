# DevBench Analytics 🚀

DevBench Analytics is a full-stack MERN application that provides a modern, interactive technical assessment platform. It empowers engineers to test their skills across various domains like Web Development, DSA, Systems Architecture, and Machine Learning, and track their performance through an intuitive dashboard.

## 🌟 Key Features
- **JWT-Based Authentication:** Secure, stateless sessions tracking user profiles and test unlocks.
- **Timer State Management:** Custom React hook logic to strictly enforce countdown timers during active tests.
- **Data Visualization:** Interactive line charts utilizing Recharts to map a user's chronological score progression and mastery over time.
- **Real-Time Grading Logic:** Secure, backend-driven evaluation of test answers to prevent frontend manipulation, complete with detailed result breakdowns.
- **Freemium Mock Gateway:** A custom, conditional UI payment gateway simulator demonstrating advanced React state for switching between Card, UPI, and Net Banking form validations.

## 🏗️ Architectural Overview (MERN Data Flow)
DevBench operates on a modern decoupled architecture:
1. **Frontend (Vite + React + Tailwind):** Manages all UI states, routing (React Router), and user interactions. When a user clicks "Submit", the frontend bundles the `selectedAnswers` dictionary and fires a POST request.
2. **Backend (Express + Node.js):** Acts as the secure middleman. It validates the attached JWT token, ensuring the user is authorized.
3. **Database (MongoDB):** The Express controller fetches the definitive test answers from the MongoDB cluster.
4. **Processing & Response:** The backend cross-references the user's answers against the database truth, calculates the final score, saves a new `Score` document referencing the `User` ObjectId, and returns the grading metrics back to the frontend to render the Result Summary page.

## 📁 Repository Structure

```text
devbench-analytics/
├── backend/                  # Express.js API Server
│   ├── models/               # Mongoose Schemas (User, Test, Score)
│   ├── .env                  # Environment variables (Git-ignored)
│   ├── package-lock.json     # Backend dependency lockfile
│   ├── package.json          # Backend dependencies
│   ├── seed.js               # Database seeding script
│   └── server.js             # API routes and server config
├── frontend/                 # React + Vite Client
│   ├── node_modules/         # Dependencies (Git-ignored)
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/           # Images, SVGs, etc.
│   │   ├── components/       # Reusable React components (Navbar, Dashboard, etc.)
│   │   ├── App.css           # App-specific styles
│   │   ├── App.jsx           # Main routing and layout
│   │   ├── index.css         # Tailwind directives and global styles
│   │   └── main.jsx          # React DOM entry point
│   ├── .gitignore            # Git ignore rules
│   ├── .oxlintrc.json        # Oxlint configuration
│   ├── index.html            # Vite entry HTML
│   ├── package-lock.json     # Frontend dependency lockfile
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite configuration and proxy setup
└── README.md
```

## ⚙️ Local Installation Instructions

Follow these steps to run DevBench locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/devbench-analytics.git
   cd devbench-analytics
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MONGO_URI and JWT_SECRET
   node seed.js # Seed the database with the initial assessments
   npm run dev # Starts nodemon on port 3000
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev # Starts Vite server on port 5173
   ```
4. **Access the App:** Open your browser and navigate to `http://localhost:5173`.

## 🧠 Biggest Technical Challenge: Managing React Side-Effects

**The Challenge:**
Implementing the active test countdown timer proved complex. If the timer logic was strictly bound to a standard `setInterval` inside a basic component, it could cause a memory leak or an infinite re-rendering loop. Furthermore, when the timer hit zero, it needed to trigger an asynchronous API submission gracefully without crashing the component state.

**The Solution:**
We mastered the `useEffect` hook to carefully control this side-effect. We built a robust dependency array `[timeLeft, loading, test]` that ensures the interval accurately ticks down one second at a time. Crucially, the cleanup function `return () => clearInterval(timer);` guarantees that if the component unmounts prematurely (e.g. if the user leaves the page), the interval is destroyed, completely eliminating memory leaks. When `timeLeft <= 0`, the effect safely orchestrates the `handleSubmitTest()` function.
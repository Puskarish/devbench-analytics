import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ActiveTestArena from './components/ActiveTestArena';
import ResultSummary from './components/ResultSummary';
import AssessmentHub from './components/AssessmentHub';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Landing from './components/Landing';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Help from './components/Help';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      {/* Our globally persistent Navbar component */}
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tests" element={<AssessmentHub />} />
          <Route path="/test/:id" element={<ActiveTestArena />} />
          <Route path="/result" element={<ResultSummary />} />
          {/* Wildcard Catch-All Route for 404 Pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

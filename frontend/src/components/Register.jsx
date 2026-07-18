import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('/api/auth/signup', { username, email, password });
      await axios.post('https://devbench-api.onrender.com/signup', { username, email, password });
      // On successful signup, redirect them to login page
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="DeveloperJohn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
            Sign Up
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Log In here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

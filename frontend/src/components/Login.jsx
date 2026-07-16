import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  // State to track what the user types into the inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents the browser from refreshing the page on submit
    try {
      // Axios acts as the bridge here, sending the email/password to our Node backend
      // Note: We use the /api/auth proxy we set up in Vite to avoid CORS issues
      const response = await axios.post('/api/auth/login', { email, password });
      
      // If successful, the backend sends back a VIP wristband (JWT). We save it to localStorage.
      localStorage.setItem('token', response.data.token);
      
      // Redirect the user to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // If the backend sends an error (e.g., wrong password), we catch it and display it
      setError(err.response?.data || 'An error occurred during login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 tracking-tight">Welcome Back</h2>
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-5">
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
            Log In
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

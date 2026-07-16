import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  // We use useLocation so this component technically "re-renders" every time the URL changes.
  // This ensures our Navbar immediately notices if the user logs in or out and changes pages.
  const location = useLocation(); 
  
  // Check if our JWT VIP wristband exists in the browser's storage
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // Converts the string (or null) to a true/false boolean

  const handleLogout = () => {
    // 1. Destroy the JWT token from storage. 
    // Since our backend is stateless, simply deleting the token logs the user out instantly!
    localStorage.removeItem('token');
    
    // Note: In a fully fleshed-out app, we would also call something like `AuthContext.logout()` 
    // here to update the global React state instantly across all components.

    // 2. Redirect the user back to the landing page
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-black text-blue-600 tracking-tighter hover:text-blue-700 transition-colors">
              DevBench<span className="text-gray-800">.</span>
            </Link>
          </div>

          {/* Navigation Links - Conditionally Rendered! */}
          <div className="flex space-x-1 sm:space-x-6 items-center">
            {!isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-blue-600 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors">Home</Link>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 px-1.5 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors">Dashboard</Link>
                <Link to="/tests" className="text-gray-600 hover:text-blue-600 px-1.5 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors">Assessments</Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 px-1.5 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-colors">Profile</Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ml-1 sm:ml-4 border border-transparent hover:border-red-100 whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            )}
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

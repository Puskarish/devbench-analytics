import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center transform transition-all hover:scale-105">
        <h1 className="text-9xl font-black text-blue-100">404</h1>
        <h2 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4 tracking-tight">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-10 text-lg font-medium max-w-md mx-auto">
          It looks like you took a wrong turn. The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/dashboard" 
          className="inline-block bg-blue-600 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

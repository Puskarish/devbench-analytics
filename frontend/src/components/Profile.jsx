import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load profile. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg font-bold text-gray-500 animate-pulse tracking-wide">Loading profile...</p>
      </div>
    );
  }
  
  if (error) return <div className="min-h-[80vh] flex justify-center items-center text-red-500 font-bold">{error}</div>;

  const cleanUsername = user.username.replace(/[^a-zA-Z0-9]/g, '') || 'User';
  const avatarUrl = `https://ui-avatars.com/api/?name=${cleanUsername}&background=4F46E5&color=fff&size=256&font-size=0.45&bold=true`;

  return (
    <div className="min-h-[80vh] bg-gray-50 p-6 sm:p-8 flex justify-center items-start pt-16">
      {/* Removed transition-all to prevent weird initial rendering morphs during page load */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Header Cover Background */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative flex justify-center">
          
          {/* Avatar Container - Perfectly Centered */}
          <div className="w-32 h-32 absolute -bottom-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-10 flex-shrink-0">
            <img 
              src={avatarUrl}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
        
        {/* Profile Info Section */}
        <div className="px-6 sm:px-10 pb-10 pt-24 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">{user.username}</h1>
          <p className="text-gray-500 font-medium mb-8 text-base sm:text-lg">{user.email}</p>

          <div className="w-full space-y-4">
            <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50 flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">Member Since</span>
              <span className="font-bold text-gray-900 text-base sm:text-lg">
                {new Date(user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
            <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100/50 flex justify-between items-center">
              <span className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest">Account Status</span>
              <span className="bg-green-100 text-green-700 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-green-200 shadow-sm">
                Active
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;

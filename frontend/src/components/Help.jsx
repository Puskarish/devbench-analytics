import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-500 font-medium">Everything you need to know about using DevBench.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 shadow-sm transition hover:shadow-md">
            <h3 className="text-2xl font-bold text-blue-900 mb-3">Getting Started</h3>
            <p className="text-blue-800 leading-relaxed">Learn how to create an account, navigate the dashboard, and select your first technical assessment.</p>
          </div>
          
          <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 shadow-sm transition hover:shadow-md">
            <h3 className="text-2xl font-bold text-indigo-900 mb-3">Assessments & Grading</h3>
            <p className="text-indigo-800 leading-relaxed">Understand how our secure backend grading system evaluates your answers and prevents cheating.</p>
          </div>

          <div className="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-sm transition hover:shadow-md">
            <h3 className="text-2xl font-bold text-green-900 mb-3">Account Settings</h3>
            <p className="text-green-800 leading-relaxed">Update your profile, change your password, and manage your DevBench account data securely.</p>
          </div>

          <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 shadow-sm transition hover:shadow-md">
            <h3 className="text-2xl font-bold text-purple-900 mb-3">Technical Issues</h3>
            <p className="text-purple-800 leading-relaxed">Troubleshoot common issues like browser compatibility, clearing cache, or connection drops.</p>
          </div>
        </div>

        <div className="mt-16 text-center border-t pt-10 border-gray-100">
          <p className="text-gray-500 mb-6 font-medium text-lg">Still need help?</p>
          <Link to="/contact" className="inline-block bg-gray-900 text-white font-bold py-4 px-10 rounded-xl hover:bg-black transition-colors shadow-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;

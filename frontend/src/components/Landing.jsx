import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col font-sans w-full">
      
      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-8">
            Master your technical skills with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">DevBench.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform for software engineers to test their knowledge, track their progress, and prepare for hardcore technical interviews.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white font-black text-lg py-4 px-10 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
            <Link 
              to="/login" 
              className="bg-white text-gray-800 border-2 border-gray-200 font-bold text-lg py-4 px-10 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Log In to Account
            </Link>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section className="bg-white py-32 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="p-6">
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-sm">1</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose a Topic</h3>
              <p className="text-gray-500 text-lg leading-relaxed">Select from dozens of highly curated assessments covering React, Node.js, C++, and hardcore DSA.</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-sm">2</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Take the Test</h3>
              <p className="text-gray-500 text-lg leading-relaxed">Immerse yourself in our secure, timed testing arena designed to simulate real interview pressure.</p>
            </div>
            <div className="p-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-sm">3</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Progress</h3>
              <p className="text-gray-500 text-lg leading-relaxed">Review your answers instantly and watch your skills grow over time via your personalized dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-gray-300 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-4xl font-black text-white tracking-tighter mb-6 inline-block">
              DevBench<span className="text-blue-500">.</span>
            </Link>
            <p className="text-gray-400 max-w-sm mt-2 text-lg">
              Empowering the next generation of software engineers through rigorous, targeted assessments.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Platform</h4>
            <ul className="space-y-4 font-medium text-gray-400">
              <li><Link to="/tests" className="hover:text-blue-400 transition-colors">Assessments</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/register" className="hover:text-blue-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Legal & Support</h4>
            <ul className="space-y-4 font-medium text-gray-400">
              <li><Link to="/terms" className="hover:text-blue-400 transition-colors cursor-pointer">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-400 transition-colors cursor-pointer">Privacy Policy</Link></li>
              <li><Link to="/help" className="hover:text-blue-400 transition-colors cursor-pointer">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors cursor-pointer">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-gray-800 text-center text-sm text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} DevBench Analytics. All rights reserved.
        </div>
      </footer>
      
    </div>
  );
};

export default Landing;

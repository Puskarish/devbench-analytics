import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-gray-500 mb-8 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-10 text-gray-700 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">1. Introduction</h2>
            <p>Welcome to DevBench. By accessing this website, we assume you accept these terms and conditions. Do not continue to use DevBench if you do not agree to take all of the terms and conditions stated on this page.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">2. License</h2>
            <p>Unless otherwise stated, DevBench and/or its licensors own the intellectual property rights for all material on DevBench. All intellectual property rights are reserved. You may access this from DevBench for your own personal use subjected to restrictions set in these terms and conditions.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">3. User Responsibilities</h2>
            <p>As a user of our platform, you agree to provide accurate information during registration and to maintain the security of your account. Any cheating, unauthorized automation, or manipulation of the assessment grading engine is strictly prohibited and will result in a permanent ban.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

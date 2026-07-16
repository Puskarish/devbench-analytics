import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-black text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-500 mb-8 font-medium">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-10 text-gray-700 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">1. Data Collection</h2>
            <p>At DevBench, one of our main priorities is the privacy of our visitors. We collect information that you provide directly to us when you register for an account (Email, Username), take an assessment (Test Scores), or contact our support team.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">2. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to provide, operate, and maintain our website; to understand and analyze how you use our website; and to populate your personal analytics dashboard with historical performance data.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b pb-2">3. Data Security</h2>
            <p>We take the security of your data extremely seriously. We utilize industry-standard bcrypt hashing for passwords and secure JSON Web Tokens (JWT) to authenticate and isolate your session data from other users.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

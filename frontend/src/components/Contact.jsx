import React from 'react';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! Your message has been sent successfully. Our support team will respond shortly.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 py-20 pt-24">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-sm border border-gray-100 p-10 md:p-14">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Contact Support</h1>
          <p className="text-gray-500 font-medium text-lg">We're here to help. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Your Name</label>
            <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium" placeholder="John Doe" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
            <input type="email" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900 font-medium" placeholder="john@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
            <textarea className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 h-40 resize-none text-gray-900 font-medium" placeholder="How can we help you today?" required></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform transition hover:-translate-y-1 text-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

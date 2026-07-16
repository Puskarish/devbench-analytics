import React, { useState } from 'react';
import axios from 'axios';

const MockPaymentModal = ({ isOpen, onClose, test, onSuccess }) => {
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');

  if (!isOpen || !test) return null;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (method === 'card') {
      const expiryVal = e.target.expiry.value;
      if (expiryVal) {
        const [month, year] = expiryVal.split('/');
        if (!month || !year || isNaN(month) || isNaN(year)) {
          return alert("Please enter expiry in MM/YY format");
        }
        if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
          return alert("Invalid expiry month. Must be between 01 and 12");
        }
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2), 10);
        
        const expMonth = parseInt(month, 10);
        const expYear = parseInt(year, 10);
        
        if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
          return alert("Payment Failed: This card has expired!");
        }
      }
    }

    setLoading(true);
    
    // Simulate network delay for realism
    setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/payment/mock-checkout', { testId: test._id }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLoading(false);
        onSuccess(test._id);
        setIsSuccess(true);
      } catch (error) {
        console.error('Payment failed:', error.response || error);
        
        // If the backend returns a 404, it means the server wasn't restarted to load the new route!
        if (error.response?.status === 404) {
          alert('Payment Failed: The backend route /api/payment/mock-checkout was not found. Please completely restart your Node.js backend server so it can register the new payment route!');
        } else {
          alert('Payment failed. Check the console for details.');
        }
        
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900">Complete Payment</h3>
            <p className="text-sm text-gray-500">DevBench Secure Checkout</p>
          </div>
          <button onClick={() => { setIsSuccess(false); onClose(); }} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-500 mb-8">Your test has been unlocked and added to your account.</p>
              <button 
                onClick={() => { setIsSuccess(false); onClose(); }} 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg"
              >
                Continue to Dashboard
              </button>
            </div>
          ) : (
            <>
          {/* Order Summary */}
          <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100 flex justify-between items-center">
            <div>
              <span className="block text-blue-900 font-bold">{test.title}</span>
              <span className="text-blue-700 text-xs font-bold uppercase tracking-wider">Lifetime Access</span>
            </div>
            <span className="text-blue-900 font-black text-2xl">₹{test.price}</span>
          </div>

          {/* Payment Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setMethod('card')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${method === 'card' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Card</button>
            <button onClick={() => setMethod('upi')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${method === 'upi' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>UPI</button>
            <button onClick={() => setMethod('netbanking')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${method === 'netbanking' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>Net Banking</button>
          </div>

          {/* Dynamic Form based on State */}
          <form onSubmit={handlePayment}>
            {method === 'card' && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                  <input type="text" placeholder="4111 1111 1111 1111" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry</label>
                    <input type="text" name="expiry" placeholder="MM/YY" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV</label>
                    <input type="password" placeholder="***" maxLength="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                  </div>
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="space-y-4 animate-fade-in py-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Virtual Payment Address (VPA)</label>
                  <input type="text" placeholder="username@okhdfc" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
              </div>
            )}

            {method === 'netbanking' && (
              <div className="space-y-4 animate-fade-in py-2">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Select Bank</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    required
                  >
                    <option value="">Choose a bank...</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                  </select>
                </div>
                {selectedBank && (
                  <div className="space-y-4 animate-fade-in mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Customer ID / Account Number</label>
                      <input type="text" placeholder="Enter Customer ID" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Secure PIN / Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-mono" required />
                    </div>
                  </div>
                )}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg transition-all flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  Pay ₹{test.price} Securely
                </>
              )}
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400 font-bold flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              100% Mock Testing Environment
            </span>
          </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockPaymentModal;

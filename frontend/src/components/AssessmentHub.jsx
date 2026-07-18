import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MockPaymentModal from './MockPaymentModal';

const AssessmentHub = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [unlockedTests, setUnlockedTests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTestToBuy, setSelectedTestToBuy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch all tests and user profile (which now includes unlockedTests) concurrently!
        const [testsRes, userRes] = await Promise.all([
          axios.get('/tests', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/me', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        // Add this line inside your fetchData function after axios.get
        console.log("Tests from backend:", testsRes.data); 
        setTests(testsRes.data);
        
        setTests(testsRes.data);
        setUnlockedTests(userRes.data.unlockedTests || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleOpenModal = (test) => {
    setSelectedTestToBuy(test);
    setModalOpen(true);
  };

  const handlePaymentSuccess = (testId) => {
    // Instantly add the newly purchased test ID to our local state array
    // This immediately re-renders the button from "Buy" to "Start Test" without a refresh!
    setUnlockedTests(prev => [...prev, testId]);
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg font-bold text-gray-500 animate-pulse tracking-wide">Loading assessments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 p-8 pt-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Assessment Hub</h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Choose a technical topic to prove your skills and track your progress over time.</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['All', ...new Set(tests.map(test => test.category))].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${activeCategory === category ? 'bg-blue-600 text-white shadow-md transform -translate-y-0.5' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(activeCategory === 'All' ? tests : tests.filter(test => test.category === activeCategory)).map(test => (
            <div key={test._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transform transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
              <div className="h-3 bg-blue-600"></div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">{test.category}</span>
                    {test.isFree && (
                      <span className="bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full border border-green-200 shadow-sm animate-pulse">
                        FREE DEMO
                      </span>
                    )}
                  </div>
                  <span className="text-gray-400 text-xs font-bold mt-1">{test.questionsCount} Questions</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.title}</h3>
                <p className="text-gray-500 text-sm mb-6 flex-1 leading-relaxed">{test.description}</p>
                
                <div className="mt-auto">
                  {test.isFree || unlockedTests.includes(test._id) ? (
                    <Link 
                      to={`/test/${test._id}`}
                      className="block w-full text-center bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Start Test
                    </Link>
                  ) : (
                    <button 
                      onClick={() => handleOpenModal(test)}
                      className="w-full text-center bg-gray-900 text-white hover:bg-black font-bold py-3 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      Buy for ₹{test.price}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <MockPaymentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        test={selectedTestToBuy} 
        onSuccess={handlePaymentSuccess} 
      />
    </div>
  );
};

export default AssessmentHub;

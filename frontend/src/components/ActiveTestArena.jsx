import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ActiveTestArena = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [loading, setLoading] = useState(true);

  // 1. Fetch real test data
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`/tests/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTest(response.data);
      } catch (error) {
        console.error('Failed to fetch test:', error);
        navigate('/dashboard'); // Kick them out if invalid ID
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, navigate]);

  // 2. Countdown Timer
  useEffect(() => {
    if (loading || !test) return;

    if (timeLeft <= 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, test]);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg font-bold text-gray-500 animate-pulse tracking-wide">Loading test environment...</p>
      </div>
    );
  }

  if (!test) return null;

  const currentQuestion = test.questions[currentQuestionIndex];

  // 3. User Selection
  const handleSelectOption = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: option
    });
  };

  // 4. Submit
  const handleSubmitTest = async () => {
    const token = localStorage.getItem('token');

    try {
      // Send raw answers to backend for secure grading
      const response = await axios.post('/scores', {
        testId: id,
        answers: selectedAnswers
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Pass the securely calculated score to the Result page
      navigate('/result', { 
        state: { 
          score: response.data.data.score, 
          total: response.data.data.totalPossible,
          testDetails: response.data.testDetails,
          userAnswers: selectedAnswers
        } 
      });
      
    } catch (error) {
      console.error('Failed to submit test', error);
      alert('Error submitting test. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-16 pb-20">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-blue-600 text-white p-6 md:p-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">{test.title}</h2>
            <p className="text-blue-100 text-sm md:text-base font-medium mt-1">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
          </div>
          
          <div className="bg-blue-800 px-4 py-2 rounded-xl font-mono font-bold text-xl shadow-inner flex items-center gap-2 border border-blue-700/50">
            <span className="text-blue-300 text-xs uppercase tracking-widest mr-1 hidden md:inline">Time Left</span>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Question Area */}
        <div className="p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 leading-relaxed">
            {currentQuestion.text}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className={`w-full text-left p-6 rounded-2xl border-2 font-semibold text-lg transition-all ${
                  selectedAnswers[currentQuestion.id] === option 
                    ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-md ring-4 ring-blue-500/20' 
                    : 'border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          
          {currentQuestionIndex === test.questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              className="bg-green-500 text-white px-8 py-3.5 rounded-xl font-black text-lg hover:bg-green-600 shadow-lg transform transition hover:-translate-y-1 ring-4 ring-green-500/30"
            >
              Submit Final Test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              className="bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-md transition-colors"
            >
              Next Question
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default ActiveTestArena;

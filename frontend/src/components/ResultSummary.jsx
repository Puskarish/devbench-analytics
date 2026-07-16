import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

const ResultSummary = () => {
  const location = useLocation();
  const { score, total, testDetails, userAnswers } = location.state || {};

  // If the user navigates directly to /result without taking a test, kick them back to the dashboard
  if (score === undefined) {
    return <Navigate to="/dashboard" />;
  }

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60; // 60% is a passing grade

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-12 pb-24">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 text-center p-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Test Complete!</h1>
          <p className="text-gray-500 font-medium mb-10">Here is how you performed.</p>

          <div className="flex justify-center items-center gap-10 mb-10">
            <div className={`w-48 h-48 rounded-full flex items-center justify-center border-8 shadow-inner ${passed ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
              <span className={`text-6xl font-black tracking-tighter ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {percentage}%
              </span>
            </div>
            <div className="text-left space-y-2">
              <p className="text-2xl font-bold text-gray-800">Score: {score} / {total}</p>
              <span className={`inline-block px-4 py-1 rounded-full font-bold text-sm uppercase tracking-widest border ${passed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                {passed ? 'Passed' : 'Failed'}
              </span>
            </div>
          </div>

          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-xl hover:bg-blue-700 transition-colors shadow-md transform hover:-translate-y-0.5"
          >
            Return to Dashboard
          </Link>
        </div>

        {/* Detailed Review Section */}
        {testDetails && userAnswers && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl font-black text-gray-900 mb-8 border-b pb-4">Detailed Answer Review</h2>
            
            <div className="space-y-10">
              {testDetails.questions.map((question, index) => {
                const userAnswer = userAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                const isSkipped = !userAnswer;

                return (
                  <div key={question.id} className="p-8 rounded-3xl bg-gray-50 border border-gray-200 shadow-sm">
                    <p className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
                      <span className="text-gray-400 mr-2">{index + 1}.</span> 
                      {question.text}
                    </p>
                    
                    <div className="space-y-3">
                      {question.options.map((option, idx) => {
                        let bgColor = "bg-white border-gray-200 text-gray-600";
                        
                        if (option === question.correctAnswer) {
                          // Always highlight the true correct answer in green
                          bgColor = "bg-green-100 border-green-500 text-green-800 font-bold ring-2 ring-green-200 shadow-sm";
                        } else if (option === userAnswer && !isCorrect) {
                          // Highlight the user's WRONG answer in red
                          bgColor = "bg-red-50 border-red-400 text-red-600 font-bold ring-2 ring-red-100 line-through opacity-80";
                        }

                        return (
                          <div key={idx} className={`w-full text-left p-5 rounded-xl border-2 transition-all ${bgColor}`}>
                            {option}
                          </div>
                        );
                      })}
                    </div>
                    
                    {isSkipped && (
                      <p className="text-red-600 font-bold mt-6 text-sm bg-red-100 inline-block px-4 py-2 rounded-xl border border-red-200 shadow-sm">
                        ⚠️ You skipped this question.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResultSummary;

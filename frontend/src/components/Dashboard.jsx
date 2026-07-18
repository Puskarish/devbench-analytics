import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Securely fetch scores using the JWT token
        const response = await axios.get('/scores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setScores(response.data);
      } catch (error) {
        console.error("Failed to fetch scores", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []); // <-- Empty array ensures this only runs once on load

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        {/* Tailwind CSS Animated Spinner */}
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-lg font-bold text-gray-500 animate-pulse tracking-wide">Loading your analytics...</p>
      </div>
    );
  }

  // --- CALCULATE METRICS ---
  const totalTests = scores.length;
  
  // We use reduce to sum up all the percentages, then divide by total tests
  const averageScore = totalTests > 0 
    ? Math.round(scores.reduce((acc, curr) => acc + (curr.score / curr.totalPossible), 0) / totalTests * 100)
    : 0;

  // --- PREPARE CHART DATA ---
  // Recharts needs a clean array of objects to draw the graph. 
  // We reverse the array so the oldest tests are on the left.
  // We use unique names like 'Test 1' because Recharts tooltips glitch if there are duplicate X-axis labels (like multiple tests taken on 'Jul 17').
  const chartData = [...scores].reverse().map((s, index) => ({
    name: `Test ${index + 1}`, 
    dateStr: new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    percentage: Math.round((s.score / s.totalPossible) * 100), 
    test: s.testName
  }));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Your Dashboard</h1>
          <p className="text-gray-600 mt-2 text-lg">Track your progress and analyze your past performances.</p>
        </div>

        {/* --- METRIC CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transform transition-transform hover:scale-105">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total Tests Taken</p>
              <h3 className="text-4xl font-black text-gray-800">{totalTests}</h3>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center transform transition-transform hover:scale-105">
            <div className="p-4 bg-green-50 text-green-600 rounded-xl mr-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Average Score</p>
              <h3 className="text-4xl font-black text-gray-800">{averageScore}%</h3>
            </div>
          </div>
        </div>

        {/* --- PERFORMANCE CHART --- */}
        {totalTests > 0 && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Performance Over Time</h2>
            <div className="h-80 w-full">
              {/* ResponsiveContainer makes the SVG graph stretch to fit mobile or desktop screens */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  
                  {/* dataKey="name" tells the X Axis to look at the 'name' property (Jul 15) in our array */}
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 500}} dy={10} />
                  
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 500}} dx={-10} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                    labelStyle={{ fontWeight: '900', color: '#1f2937', marginBottom: '4px' }}
                  />
                  
                  {/* dataKey="percentage" tells the Line to draw its dots based on the 'percentage' property */}
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2}} 
                    activeDot={{r: 8, strokeWidth: 0, fill: '#1d4ed8'}} 
                    name="Score %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* --- PAST ASSESSMENTS GRID --- */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Test History</h2>
        
        {scores.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
            <p className="text-gray-500 text-lg">You haven't taken any tests yet. Head to the Assessment Hub to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scores.map((scoreObj) => (
              <div key={scoreObj._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{scoreObj.testName}</h3>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
                    Completed
                  </span>
                </div>
                <div className="mt-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Final Score</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-gray-900">{scoreObj.score}</span>
                    <span className="text-xl text-gray-400 ml-2 font-medium">/ {scoreObj.totalPossible}</span>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-400 font-medium border-t border-gray-50 pt-4">
                  Taken: {new Date(scoreObj.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

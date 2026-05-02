import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { fetchMyAttempts } from '../features/tests/testSlice';

const Analytics = () => {
  const dispatch = useDispatch();
  const { attempts, loading } = useSelector((state) => state.tests);

  useEffect(() => {
    dispatch(fetchMyAttempts());
  }, [dispatch]);

  const totalAttempts = attempts.length;
  const averageScore = totalAttempts > 0 
    ? Math.round(attempts.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts) 
    : 0;

  const chartData = attempts.map((attempt, index) => ({
    name: `Test ${index + 1}`,
    score: attempt.score,
    accuracy: attempt.accuracy
  }));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="My Performance Analytics" />
        
        <main className="flex-1 p-6 lg:p-8 space-y-10">
          
          {loading ? (
             <div className="flex justify-center items-center py-20">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPrimary"></div>
             </div>
          ) : (
            <>
              {/* Top Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Average Score Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className="text-blue-100 text-sm font-medium mb-2">Average Score</p>
                  <h3 className="text-4xl font-black text-white mb-6">{averageScore}</h3>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Across {totalAttempts} Tests</span>
                  </div>
                </div>

                {/* Tests Attempted Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm font-medium mb-2">Tests Attempted</p>
                  <h3 className="text-4xl font-black text-gray-900 mb-6">{totalAttempts}</h3>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${Math.min((totalAttempts / 10) * 100, 100)}%` }}></div>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Goal: 10 per month</p>
                  </div>
                </div>

                {/* Overall Accuracy Card */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-500 text-sm font-medium mb-2">Overall Accuracy</p>
                  <h3 className="text-4xl font-black text-gray-900 mb-6">
                    {totalAttempts > 0 ? Math.round(attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / totalAttempts) : 0}%
                  </h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <p className="text-xs font-bold">Keep improving your precision!</p>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              {totalAttempts > 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Score Progression</h3>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={4} dot={{ r: 6, fill: '#4F46E5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] border border-gray-100 p-16 text-center shadow-xl shadow-gray-200/40 relative overflow-hidden mt-8">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="text-7xl mb-6 relative z-10 animate-[bounce_3s_ease-in-out_infinite]">📊</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 relative z-10">No Analytics Available Yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto font-medium relative z-10">
                    Attempt your first mock test to unlock detailed performance insights, score progression, and accuracy metrics.
                  </p>
                </div>
              )}

              {/* Recent Attempts History */}
              {totalAttempts > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Attempts History</h3>
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="p-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">Test Details</th>
                          <th className="p-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">Date</th>
                          <th className="p-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">Score</th>
                          <th className="p-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider border-b border-gray-100">Accuracy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...attempts].reverse().map((attempt) => (
                          <tr key={attempt._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 px-6">
                              <p className="font-bold text-gray-900">{attempt.test?.title || 'Unknown Test'}</p>
                              <p className="text-xs text-gray-500 mt-1">{attempt.test?.category || 'General'}</p>
                            </td>
                            <td className="p-4 px-6 text-sm text-gray-600 font-medium">
                              {new Date(attempt.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 px-6 font-black text-accentPrimary">
                              {attempt.score} <span className="text-gray-400 text-xs">/ {attempt.test?.totalMarks || '?'}</span>
                            </td>
                            <td className="p-4 px-6">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold ${attempt.accuracy >= 80 ? 'text-green-600' : attempt.accuracy >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
                                  {attempt.accuracy}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Analytics;

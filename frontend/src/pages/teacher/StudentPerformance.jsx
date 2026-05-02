import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import api from '../../services/api';

const StudentPerformance = () => {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const { data } = await api.get('/tests/analytics/all');
        setAttempts(data);
      } catch (error) {
        console.error('Failed to fetch student attempts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Students Progress" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">Performance Tracker</h2>
            <p className="text-gray-500 text-sm">Monitor how your students are performing across all mock tests.</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3">📊</div>
              <p className="text-sm font-medium text-gray-500">Total Attempts</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{attempts.length}</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mb-3">✅</div>
              <p className="text-sm font-medium text-gray-500">Avg Score</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">
                {attempts.length > 0 ? Math.round(attempts.reduce((sum, a) => sum + (a.score || 0), 0) / attempts.length) : 0}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 mb-3">🏆</div>
              <p className="text-sm font-medium text-gray-500">Highest Score</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">
                {attempts.length > 0 ? Math.max(...attempts.map(a => a.score || 0)) : 0}
              </h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mb-3">👥</div>
              <p className="text-sm font-medium text-gray-500">Unique Students</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">
                {new Set(attempts.map(a => a.user?._id || a.user)).size}
              </h3>
            </div>
          </div>

          {/* Attempts Table */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teacherPrimary"></div>
            </div>
          ) : attempts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No test attempts yet</h3>
              <p className="text-gray-400 max-w-sm mx-auto">Once your students start taking tests, their performance data will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Test</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Score</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Percentage</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {attempts.map((attempt, index) => {
                    const percentage = attempt.totalMarks > 0 ? Math.round((attempt.score / attempt.totalMarks) * 100) : 0;
                    return (
                      <tr key={attempt._id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-teacherPrimary/10 text-teacherPrimary flex items-center justify-center font-bold text-xs">
                              {(attempt.user?.name || 'S').charAt(0)}
                            </div>
                            <span className="text-sm font-bold text-gray-900">{attempt.user?.name || 'Student'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{attempt.test?.title || 'Mock Test'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-gray-900">{attempt.score}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attempt.totalMarks}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${percentage >= 70 ? 'bg-green-500' : percentage >= 40 ? 'bg-amber-400' : 'bg-red-400'}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className={`text-xs font-black ${percentage >= 70 ? 'text-green-600' : percentage >= 40 ? 'text-amber-600' : 'text-red-600'}`}>
                              {percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {attempt.createdAt ? new Date(attempt.createdAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentPerformance;

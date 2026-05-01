import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { fetchTests } from '../features/tests/testSlice';

const MockTests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tests, loading, error } = useSelector((state) => state.tests);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const filteredTests = tests.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Mock Tests & Examinations" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">🔍</span>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-accentPrimary focus:border-accentPrimary sm:text-sm" placeholder="Search tests..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPrimary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-bold">
              {error}
            </div>
          ) : tests.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">No active tests found</h3>
              <p className="text-gray-400">Check back later for upcoming mock tests.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTests.map((test) => (
                <div key={test._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-accentPrimary transition-colors">{test.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{test.category}</p>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-50 text-blue-700">Available</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1.5"><span className="text-lg">⏱️</span><span>{test.duration} mins</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-lg">❓</span><span>{test.questions.length} Questions</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-lg">🎯</span><span>{test.totalMarks} Marks</span></div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => navigate(`/dashboard/test/${test._id}`)}
                      className="flex-1 py-2 text-sm font-semibold text-white bg-accentPrimary rounded-lg hover:bg-accentPrimary/90 transition-colors shadow-sm"
                    >
                      Start Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MockTests;

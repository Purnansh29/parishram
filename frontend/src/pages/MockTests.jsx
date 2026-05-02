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
            <div className="bg-white rounded-[2rem] border border-gray-100 p-16 text-center shadow-xl shadow-gray-200/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accentPrimary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="text-7xl mb-6 relative z-10 animate-[bounce_3s_ease-in-out_infinite]">🎯</div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 relative z-10">No Active Tests Found</h3>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium relative z-10">
                You haven't been assigned any mock tests yet, or there are no active tests in your enrolled courses.
              </p>
              <button onClick={() => navigate('/dashboard')} className="relative z-10 inline-flex items-center gap-2 px-8 py-3.5 bg-accentPrimary text-white rounded-xl font-bold shadow-lg shadow-accentPrimary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Return to Dashboard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTests.map((test) => (
                <div key={test._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${test.isLocked ? 'bg-gray-400' : 'bg-blue-500'}`}></div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-accentPrimary transition-colors flex items-center gap-2">
                        {test.title}
                        {test.isLocked && <span title="Course Enrollment Required">🔒</span>}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{test.category}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${test.isLocked ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-blue-700'}`}>
                      {test.isLocked ? 'Locked' : 'Available'}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1.5"><span className="text-lg">⏱️</span><span>{test.duration} mins</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-lg">❓</span><span>{test.questions.length} Questions</span></div>
                    <div className="flex items-center gap-1.5"><span className="text-lg">🎯</span><span>{test.totalMarks} Marks</span></div>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {test.isLocked ? (
                      <button 
                        disabled
                        className="flex-1 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                      >
                        Enroll to Unlock
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate(`/dashboard/test/${test._id}`)}
                        className="flex-1 py-2 text-sm font-semibold text-white bg-accentPrimary rounded-lg hover:bg-accentPrimary/90 transition-colors shadow-sm"
                      >
                        Start Test
                      </button>
                    )}
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

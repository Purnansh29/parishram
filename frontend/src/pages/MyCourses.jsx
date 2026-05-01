import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { fetchMyCourses } from '../features/courses/courseSlice';

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myCourses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="My Courses" />
        <main className="flex-1 p-6 lg:p-8">
          
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Continue Learning</h2>
            <p className="text-gray-500 font-medium text-sm">Pick up where you left off and keep grinding!</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPrimary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-bold">
              {error}
            </div>
          ) : myCourses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses enrolled yet</h3>
              <p className="text-gray-400 mb-6">Explore our catalog and start your learning journey today.</p>
              <Link to="/dashboard" className="inline-block px-8 py-3 bg-accentPrimary text-white rounded-xl font-bold shadow-lg shadow-accentPrimary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map(course => (
                <div key={course._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-2 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded border border-white/10 mb-2">
                        {course.category}
                      </span>
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">{course.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-gray-500">Overall Progress</span>
                        <span className="text-accentPrimary">0%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-accentPrimary rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/dashboard/course/${course._id}`)}
                      className="mt-auto w-full py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Resume Learning
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

export default MyCourses;

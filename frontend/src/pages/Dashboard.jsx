import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import PopularCourses from '../components/PopularCourses';
import SubjectSelectionModal from '../components/SubjectSelectionModal';
import SEO from '../components/SEO';
import api from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isTeacher = user?.role === 'teacher' || user?.role === 'mentor';
  const isAdmin = user?.role === 'admin';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0, totalUsers: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/users/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SEO title="Dashboard" description="Your Parishram learning dashboard – track progress, access courses, and manage your study plan." />
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title={isTeacher ? "Teacher Control Center" : "Overview"} />
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isTeacher ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-lg">Real-time</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{isTeacher ? 'My Students' : 'Registered Students'}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{stats.totalStudents}</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isTeacher ? 'bg-purple-50 text-purple-600' : 'bg-purple-50 text-purple-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-lg">Real-time</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{isTeacher ? 'My Courses' : 'Available Courses'}</p>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-3xl font-black text-gray-900">10</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isTeacher ? 'bg-orange-50 text-orange-600' : 'bg-orange-50 text-orange-600'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-lg">Real-time</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{isTeacher ? 'Test Submissions' : 'Total Teachers'}</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">{isTeacher ? '24' : stats.totalTeachers}</h3>
            </div>
          </div>

          {/* Performance Analysis & Right Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">{isTeacher ? 'Recent Student Activity' : 'Performance Analysis'}</h3>
                <button className={`text-sm font-bold hover:underline ${isTeacher ? 'text-teacherPrimary' : 'text-accentPrimary'}`}>
                  {isTeacher ? 'View All Activity' : 'View Detailed Report'}
                </button>
              </div>
              <div className="space-y-8">
                {isTeacher ? (
                  <div className="space-y-6">
                    {[
                      { student: 'Rahul Kumar', action: 'completed Mock Test 1', time: '2 mins ago', score: '56/60' },
                      { student: 'Sneha Gupta', action: 'enrolled in Physics Batch', time: '1 hour ago', score: null },
                      { student: 'Amit Singh', action: 'submitted feedback', time: '3 hours ago', score: null },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teacherPrimary/10 text-teacherPrimary flex items-center justify-center font-bold">
                            {item.student.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{item.student}</p>
                            <p className="text-xs text-gray-500">{item.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400 font-medium">{item.time}</p>
                          {item.score && <p className="text-xs font-bold text-teacherPrimary">{item.score}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-700">Biology</span>
                        <span className="text-gray-400">0%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-bold">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700">Physics</span>
                        </div>
                        <span className="text-gray-400">0%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-400 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                      <p className="text-xs text-gray-400 font-medium">Take a test to see your performance breakdown.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="text-gray-700">Chemistry</span>
                        <span className="text-gray-400">0%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className={`${isTeacher ? 'bg-teacherPrimary' : 'bg-accentPrimary'} p-8 rounded-2xl shadow-lg relative overflow-hidden group`}>
                <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-4 translate-y-4">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{isTeacher ? 'Create Content' : 'Practice Session'}</h3>
                <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed">
                  {isTeacher 
                    ? "Add new courses, lessons or mock tests to engage your students."
                    : "You're 20 minutes away from your daily goal. Start a quick quiz now."}
                </p>
                <button 
                  onClick={() => isTeacher ? navigate('/dashboard/teacher/courses') : setIsModalOpen(true)}
                  className={`bg-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group-hover:gap-3 ${isTeacher ? 'text-teacherPrimary' : 'text-accentPrimary'}`}
                >
                  {isTeacher ? 'Manage My Courses' : 'Start Mock Test'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-[0.7rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{isTeacher ? 'Quick Actions' : 'Subject Explorer'}</h4>
                <div className="flex flex-wrap gap-2">
                  {isTeacher ? (
                    ['Add Lesson', 'New Test', 'Mark Attendance', 'Send Notice', 'Update Batch'].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold border border-indigo-100/50 hover:bg-indigo-100 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))
                  ) : (
                    ['Organic Chemistry', 'Plant Physiology', 'Electromagnetism', 'Genetics', 'Physical Chemistry', 'Modern Physics'].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100/50 hover:bg-blue-100 transition-colors cursor-pointer">
                        {tag}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <PopularCourses />
          </div>
        </main>
      </div>

      {/* Modal */}
      <SubjectSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;

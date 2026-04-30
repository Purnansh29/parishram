import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import PopularCourses from '../components/PopularCourses';
import SubjectSelectionModal from '../components/SubjectSelectionModal';
import SEO from '../components/SEO';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SEO title="Dashboard" description="Your Parishram learning dashboard – track progress, access courses, and manage your study plan." />
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Overview" />
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          
          {/* Top Statistics Cards */}
          {/* ... (keep existing cards) ... */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-lg">+3 this week</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Tests attempted</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">42</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-lg">Top 5%</span>
              </div>
              <p className="text-sm font-medium text-gray-500">Accuracy %</p>
              <div className="flex items-center gap-2 mt-1">
                <h3 className="text-3xl font-black text-gray-900">88.4%</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-lg">Silver Tier</span>
              </div>
              <p className="text-sm font-medium text-gray-500">National Rank</p>
              <h3 className="text-3xl font-black text-gray-900 mt-1">#1,284</h3>
            </div>
          </div>

          {/* Performance Analysis & Right Stack */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-gray-900">Performance Analysis</h3>
                <button className="text-accentPrimary text-sm font-bold hover:underline">View Detailed Report</button>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-700">Biology</span>
                    <span className="text-gray-400">92%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">Physics</span>
                      <span className="bg-red-50 text-red-600 text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider">Weak Area</span>
                    </div>
                    <span className="text-gray-400">64%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">Recommended: Practice "Optics" & "Thermodynamics" mcqs.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-gray-700">Chemistry</span>
                    <span className="text-gray-400">78%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-accentPrimary p-8 rounded-2xl shadow-lg relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-4 translate-y-4">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Practice Session</h3>
                <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed">
                  You're 20 minutes away from your daily goal. Start a quick quiz now.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-accentPrimary px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group-hover:gap-3"
                >
                  Start Mock Test
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h4 className="text-[0.7rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Subject Explorer</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Organic Chemistry', 'Plant Physiology', 
                    'Electromagnetism', 'Genetics', 
                    'Physical Chemistry', 'Modern Physics'
                  ].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100/50 hover:bg-blue-100 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
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

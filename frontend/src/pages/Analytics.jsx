import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const testSeries = [
  {
    id: 1,
    title: 'Full Syllabus Mock Test 08',
    category: 'BIOLOGY',
    premium: true,
    description: 'Comprehensive review covering Human Physiology, Genetics, and...',
    time: '180 Mins',
    enrolled: '12.4k Enrolled',
    status: 'Start Test',
    type: 'primary'
  },
  {
    id: 2,
    title: 'Organic Chemistry Special',
    category: 'CHEMISTRY',
    premium: false,
    description: 'Focus on Hydrocarbons, Haloalkanes, and Alcohols. Includes 45 highly...',
    time: '60 Mins',
    level: 'Hard',
    status: 'Start Test',
    type: 'primary'
  },
  {
    id: 3,
    title: 'Mechanics & Kinematics',
    category: 'PHYSICS',
    premium: false,
    badge: 'RE-ATTEMPT',
    description: 'Deep dive into Newton\'s laws and 2D motion with conceptual numerical...',
    time: '90 Mins',
    attempts: '2 Attempts',
    status: 'View Analysis',
    type: 'outline'
  },
  {
    id: 4,
    title: 'NTA Abhyas Mock 12',
    category: 'FULL MOCK',
    premium: false,
    description: 'Official practice test released by NTA for the upcoming 2025 examination...',
    time: '200 Mins',
    official: true,
    status: 'Start Test',
    type: 'primary'
  },
  {
    id: 5,
    title: 'Previous Year Paper (2024)',
    category: 'FULL MOCK',
    locked: true,
    description: 'Access 10+ years of solved papers for just ₹99. Our mission is to make quality content accessible to all.',
    status: 'Unlock Now',
    type: 'link'
  },
  {
    id: 6,
    title: 'Plant Diversity & Reproduction',
    category: 'BOTANY',
    premium: false,
    description: 'High yield questions covering Algae, Bryophytes, Pteridophytes...',
    time: '45 Mins',
    status: 'Start Test',
    type: 'primary'
  }
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Test Series & Analytics" />
        
        <main className="flex-1 p-6 lg:p-8 space-y-10">
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Series</h2>
          </div>

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
              <h3 className="text-4xl font-black text-white mb-6">542 / 720</h3>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Top 12% in Batch</span>
              </div>
            </div>

            {/* Tests Attempted Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm font-medium mb-2">Tests Attempted</p>
              <h3 className="text-4xl font-black text-gray-900 mb-6">24</h3>
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Goal: 32 per month</p>
              </div>
            </div>

            {/* Next Live Test Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-sm font-medium mb-2">Next Live Test</p>
              <h3 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">14:20:05</h3>
              <div className="flex items-center gap-2 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-bold">National Level NEET Mock 04</p>
              </div>
            </div>
          </div>

          {/* Test Series Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {testSeries.map((test) => (
              <div key={test.id} className={`bg-white rounded-3xl border ${test.locked ? 'border-dashed border-gray-300' : 'border-gray-100'} p-8 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative`}>
                
                {test.locked ? (
                  <div className="flex flex-col items-center justify-center flex-1 text-center py-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">{test.title}</h3>
                    <p className="text-sm text-gray-400 mb-8 max-w-[200px]">{test.description}</p>
                    <button className="text-blue-600 font-black text-lg hover:underline">{test.status}</button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">{test.category}</span>
                        {test.badge && (
                          <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider">{test.badge}</span>
                        )}
                      </div>
                      {test.premium && (
                        <div className="flex items-center gap-1 text-amber-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Premium</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{test.title}</h3>
                    <p className="text-sm text-gray-500 mb-8 leading-relaxed flex-1">{test.description}</p>

                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex items-center gap-2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-bold">{test.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-400">
                        {test.attempts ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span className="text-xs font-black text-blue-600">{test.attempts}</span>
                          </>
                        ) : test.official ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-xs font-black text-green-600">Official</span>
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-xs font-bold">{test.enrolled || test.level}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                      test.type === 'primary' 
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg' 
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}>
                      {test.status}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;

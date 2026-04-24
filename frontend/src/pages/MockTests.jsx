import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const DUMMY_TESTS = [
  { id: '1', title: 'Full Syllabus JEE Main Mock 1', date: '2024-05-01', duration: '3h 00m', questions: '90', status: 'Upcoming' },
  { id: '2', title: 'Mathematics - Calculus Advanced', date: '2024-05-03', duration: '1h 30m', questions: '30', status: 'Scheduled' },
  { id: '3', title: 'Physics - Mechanics & Heat', date: '2024-04-15', duration: '1h 30m', questions: '30', status: 'Completed' },
  { id: '4', title: 'Full Syllabus NEET Mock 4', date: '2024-04-10', duration: '3h 20m', questions: '180', status: 'Completed' },
  { id: '5', title: 'Chemistry - Organic Basics', date: '2024-04-05', duration: '1h 00m', questions: '25', status: 'Completed' },
];

const MockTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTests = DUMMY_TESTS.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

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
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">View Past Results</button>
              <button className="px-4 py-2 bg-accentPrimary text-white rounded-lg text-sm font-medium hover:bg-accentPrimary/90 transition-colors shadow-sm">+ Create New Test</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTests.map((test) => (
              <div key={test.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${test.status === 'Upcoming' ? 'bg-blue-500' : test.status === 'Scheduled' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-accentPrimary transition-colors">{test.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">📅 {test.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${test.status === 'Upcoming' ? 'bg-blue-50 text-blue-700' : test.status === 'Scheduled' ? 'bg-orange-50 text-orange-700' : 'bg-green-50 text-green-700'}`}>{test.status}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1.5"><span className="text-lg">⏱️</span><span>{test.duration}</span></div>
                  <div className="flex items-center gap-1.5"><span className="text-lg">❓</span><span>{test.questions} Questions</span></div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 py-2 text-sm font-semibold text-accentPrimary bg-accentPrimary/5 rounded-lg hover:bg-accentPrimary/10 transition-colors">{test.status === 'Completed' ? 'View Analysis' : 'Edit Details'}</button>
                  <button className="flex-1 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Manage Questions</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MockTests;

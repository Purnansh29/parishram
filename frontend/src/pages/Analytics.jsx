import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Performance Analytics" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Avg. Test Score</p>
              <h3 className="text-2xl font-bold text-gray-900">74%</h3>
              <div className="mt-2 flex items-center text-xs font-medium text-green-600">
                <span>↑ 12%</span><span className="ml-1 text-gray-400 font-normal">from last month</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Attendance Rate</p>
              <h3 className="text-2xl font-bold text-gray-900">92.5%</h3>
              <div className="mt-2 flex items-center text-xs font-medium text-green-600">
                <span>↑ 2%</span><span className="ml-1 text-gray-400 font-normal">stable</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Active Students</p>
              <h3 className="text-2xl font-bold text-gray-900">1,248</h3>
              <div className="mt-2 flex items-center text-xs font-medium text-blue-600">
                <span>New: +42</span><span className="ml-1 text-gray-400 font-normal">this week</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-500 mb-1">Revenue Growth</p>
              <h3 className="text-2xl font-bold text-gray-900">₹8.4L</h3>
              <div className="mt-2 flex items-center text-xs font-medium text-green-600">
                <span>↑ 18%</span><span className="ml-1 text-gray-400 font-normal">Q1 Target Met</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">Monthly Enrollment</h3>
                <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-gray-50">
                  <option>Last 6 Months</option><option>Last Year</option>
                </select>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-2">
                {[45, 62, 58, 84, 76, 92].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full bg-accentPrimary/20 rounded-t-lg group-hover:bg-accentPrimary/40 transition-colors relative" style={{ height: `${val}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{val} Enrolled</div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6">Student Distribution</h3>
              <div className="flex items-center justify-center h-64 gap-12">
                <div className="relative w-40 h-40">
                  <div className="absolute inset-0 rounded-full border-[16px] border-accentPrimary/10"></div>
                  <div className="absolute inset-0 rounded-full border-[16px] border-accentPrimary border-t-transparent border-l-transparent rotate-45"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-900">72%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">JEE Prep</span>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accentPrimary"></div><span className="text-sm font-medium text-gray-600">JEE: 72%</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accentPrimary/60"></div><span className="text-sm font-medium text-gray-600">NEET: 18%</span></div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-accentPrimary/20"></div><span className="text-sm font-medium text-gray-600">Boards: 10%</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Recent System Activity</h3>
              <button className="text-accentPrimary text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="p-4 space-y-4">
              {[
                { user: 'Admin', action: 'Uploaded new mock test papers', time: '12 mins ago', icon: '⚙️' },
                { user: 'Finance', action: 'Processed 14 monthly fee payments', time: '45 mins ago', icon: '💰' },
                { user: 'Amit Sharma', action: 'Marked attendance for Class 12A', time: '2 hours ago', icon: '👨‍🏫' },
                { user: 'System', action: 'Weekly automated database backup complete', time: 'Yesterday', icon: '⚙️' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">{log.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{log.user}</p>
                      <p className="text-xs text-gray-500">{log.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;

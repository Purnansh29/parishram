import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const performanceData = [
  { month: 'Jan', score: 65, attendance: 88 },
  { month: 'Feb', score: 68, attendance: 90 },
  { month: 'Mar', score: 75, attendance: 92 },
  { month: 'Apr', score: 72, attendance: 91 },
  { month: 'May', score: 80, attendance: 95 },
  { month: 'Jun', score: 85, attendance: 94 },
];

const subjectData = [
  { subject: 'Physics', A: 85, fullMark: 100 },
  { subject: 'Chemistry', A: 92, fullMark: 100 },
  { subject: 'Maths', A: 78, fullMark: 100 },
  { subject: 'Biology', A: 95, fullMark: 100 },
  { subject: 'English', A: 88, fullMark: 100 },
];

const accuracyData = [
  { name: 'Correct', value: 740, color: '#4f46e5' },
  { name: 'Incorrect', value: 180, color: '#f87171' },
  { name: 'Unattempted', value: 80, color: '#e5e7eb' },
];

const batchData = [
  { name: 'JEE 2025', students: 450, avgScore: 78 },
  { name: 'NEET 2026', students: 380, avgScore: 82 },
  { name: 'UPSC Foundation', students: 220, avgScore: 65 },
  { name: 'Class 12 Boards', students: 510, avgScore: 88 },
];

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Performance Analytics" />
        
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          {/* Top Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Avg. Test Score" value="74%" change="+12%" positive={true} subtitle="from last month" />
            <StatCard title="Attendance Rate" value="92.5%" change="+2%" positive={true} subtitle="stable performance" />
            <StatCard title="Active Students" value="1,248" change="+42" positive={true} subtitle="new this week" />
            <StatCard title="Revenue Growth" value="₹8.4L" change="+18%" positive={true} subtitle="Q1 Target Met" />
          </div>

          {/* Main Analytics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Trend Area Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Performance Over Time</h3>
                  <p className="text-sm text-gray-500">Average test scores vs attendance trends</p>
                </div>
                <select className="text-sm border-gray-200 rounded-lg px-3 py-1.5 bg-gray-50 font-medium outline-none focus:ring-2 focus:ring-accentPrimary/20">
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#9ca3af', fontSize: 12, fontWeight: 500}} 
                    />
                    <Tooltip 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#4f46e5" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorScore)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={0}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Subject Mastery Radar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subject Mastery</h3>
              <p className="text-sm text-gray-500 mb-8">Skill distribution across topics</p>
              <div className="h-80 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectData}>
                    <PolarGrid stroke="#f3f4f6" />
                    <PolarAngleAxis dataKey="subject" tick={{fill: '#6b7280', fontSize: 11, fontWeight: 600}} />
                    <Radar
                      name="Accuracy"
                      dataKey="A"
                      stroke="#4f46e5"
                      fill="#4f46e5"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Secondary Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Batch Distribution Bar Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Batch Enrollment & Scores</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={batchData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#4b5563', fontSize: 13, fontWeight: 600}} 
                      width={120}
                    />
                    <Tooltip 
                      cursor={{fill: '#f9fafb'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="students" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
                    <Bar dataKey="avgScore" fill="#facc15" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-400">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-accentPrimary"></div> Students</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-yellow-400"></div> Avg. Score</div>
              </div>
            </div>

            {/* Test Accuracy Donut Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Test Accuracy Analysis</h3>
              <div className="h-72 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={accuracyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {accuracyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mt-[-18px]">
                  <p className="text-3xl font-black text-gray-900">74%</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive, subtitle }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <p className="text-sm font-semibold text-gray-500 mb-2">{title}</p>
    <div className="flex items-end gap-3 mb-1">
      <h3 className="text-3xl font-black text-gray-900 leading-none">{value}</h3>
      <span className={`text-xs font-bold ${positive ? 'text-green-600' : 'text-red-600'} flex items-center mb-1`}>
        {change}
      </span>
    </div>
    <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
  </div>
);

export default Analytics;

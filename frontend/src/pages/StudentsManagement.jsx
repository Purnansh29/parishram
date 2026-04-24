import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const DUMMY_STUDENTS = [
  { id: '1', name: 'Aarav Sharma', class: '12th', batch: 'JEE 2025', status: 'Active', fee: 'Paid' },
  { id: '2', name: 'Diya Patel', class: '11th', batch: 'NEET 2026', status: 'Active', fee: 'Pending' },
  { id: '3', name: 'Rohan Gupta', class: '12th', batch: 'JEE 2025', status: 'Inactive', fee: 'Paid' },
  { id: '4', name: 'Sneha Reddy', class: '10th', batch: 'Foundation', status: 'Active', fee: 'Paid' },
  { id: '5', name: 'Vikram Singh', class: '11th', batch: 'JEE 2026', status: 'Active', fee: 'Overdue' },
];

const StudentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = DUMMY_STUDENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Students Management" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">🔍</span>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-accentPrimary focus:border-accentPrimary sm:text-sm" placeholder="Search students..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <button className="px-4 py-2 bg-accentPrimary text-white rounded-lg text-sm font-medium hover:bg-accentPrimary/90 transition-colors shadow-sm">+ Add Student</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Batch</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-accentPrimary/10 text-accentPrimary flex items-center justify-center font-bold text-xs mr-3">{student.name.charAt(0)}</div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.batch}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{student.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${student.fee === 'Paid' ? 'bg-green-100 text-green-800' : student.fee === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>{student.fee}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-accentPrimary hover:text-accentWarm mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentsManagement;

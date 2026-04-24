import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const DUMMY_FINANCE = [
  { id: '1', student: 'Aarav Sharma', amount: '₹15,000', date: '2024-04-20', method: 'UPI', status: 'Success' },
  { id: '2', student: 'Diya Patel', amount: '₹12,500', date: '2024-04-18', method: 'Cash', status: 'Pending' },
  { id: '3', student: 'Rohan Gupta', amount: '₹15,000', date: '2024-04-15', method: 'Card', status: 'Success' },
  { id: '4', student: 'Sneha Reddy', amount: '₹10,000', date: '2024-04-12', method: 'UPI', status: 'Failed' },
  { id: '5', student: 'Vikram Singh', amount: '₹12,500', date: '2024-04-10', method: 'Net Banking', status: 'Success' },
];

const FinanceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredFinance = DUMMY_FINANCE.filter(f => f.student.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Finance & Fee Management" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Collected</h3>
              <p className="text-2xl font-bold text-gray-900">₹4.2L</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pending Dues</h3>
              <p className="text-2xl font-bold text-gray-900">₹85,000</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">This Month</h3>
              <p className="text-2xl font-bold text-green-600">+₹52,000</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Refunds</h3>
              <p className="text-2xl font-bold text-red-600">₹5,000</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">🔍</span>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-accentPrimary focus:border-accentPrimary sm:text-sm" placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Export CSV</button>
              <button className="px-4 py-2 bg-accentPrimary text-white rounded-lg text-sm font-medium hover:bg-accentPrimary/90 transition-colors shadow-sm">+ New Payment</button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFinance.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.student}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{tx.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.status === 'Success' ? 'bg-green-100 text-green-800' : tx.status === 'Pending' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>{tx.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-accentPrimary hover:text-accentWarm font-bold">PDF 📄</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FinanceManagement;

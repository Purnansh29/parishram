import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import PopularCourses from '../components/PopularCourses';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Overview" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Students</h3>
              <p className="text-3xl font-bold text-gray-900">1,248</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Active Teachers</h3>
              <p className="text-3xl font-bold text-gray-900">45</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Fees</h3>
              <p className="text-3xl font-bold text-gray-900">₹2.4L</p>
            </div>
          </div>
          
          {/* Popular Courses Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 lg:p-8">
            <PopularCourses />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

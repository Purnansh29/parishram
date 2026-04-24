import { useAuth } from '../context/AuthContext';

const DashboardHeader = ({ title = 'Overview' }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600 hidden sm:inline-block">Welcome, {user?.name || 'User'}</span>
        <div className="w-9 h-9 rounded-full bg-accentPrimary/10 text-accentPrimary flex items-center justify-center font-bold">
          {user?.name ? user.name.charAt(0) : 'U'}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

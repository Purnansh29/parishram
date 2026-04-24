import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: '📊' },
    { name: 'Students', path: '/dashboard/students', icon: '🎓' },
    { name: 'Teachers', path: '/dashboard/teachers', icon: '👨‍🏫' },
    { name: 'Finance', path: '/dashboard/finance', icon: '💰' },
    { name: 'Mock Tests', path: '/dashboard/mock-tests', icon: '📝' },
    { name: 'Analytics', path: '/dashboard/analytics', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full flex flex-col hidden md:flex fixed left-0 top-0 bottom-0 z-20">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-gray-900">
          <div className="w-8 h-8 rounded-xl bg-accent-gradient flex items-center justify-center text-xs font-bold text-white shadow-sm">P</div>
          <span>Parishram</span>
        </Link>
      </div>
      <div className="flex-1 py-6 px-4 overflow-y-auto">
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-accentPrimary/10 text-accentPrimary' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const isTeacher = user?.role === 'teacher' || user?.role === 'mentor';
  const isAdmin = user?.role === 'admin';

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: '📊' },
    // Student Links
    { name: 'My Courses', path: '/dashboard/my-courses', icon: '📚', studentOnly: true },
    { name: 'Mock Tests', path: '/dashboard/mock-tests', icon: '📝', studentOnly: true },
    { name: 'Analytics', path: '/dashboard/analytics', icon: '📈', studentOnly: true },
    
    // Teacher Links
    { name: 'My Created Courses', path: '/dashboard/teacher/courses', icon: '🛠️', teacherOnly: true },
    { name: 'Manage Tests', path: '/dashboard/teacher/tests', icon: '📋', teacherOnly: true },
    { name: 'Students Progress', path: '/dashboard/teacher/performance', icon: '📈', teacherOnly: true },
    
    // Admin Links
    { name: 'Students', path: '/dashboard/students', icon: '🎓', adminOnly: true },
    { name: 'Teachers', path: '/dashboard/teachers', icon: '👨‍🏫', adminOnly: true },
    { name: 'Finance', path: '/dashboard/finance', icon: '💰', adminOnly: true },
  ];

  const filteredItems = menuItems.filter(item => {
    if (item.adminOnly && !isAdmin) return false;
    if (item.teacherOnly && !isTeacher) return false;
    if (item.studentOnly && (isTeacher || isAdmin)) return false;
    return true;
  });

  // Bottom nav items for mobile (max 5)
  const bottomNavItems = filteredItems.slice(0, 4);

  const closeMobile = () => setMobileOpen(false);

  const renderNavLink = (item) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={closeMobile}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive 
            ? isTeacher ? 'bg-teacherPrimary/10 text-teacherPrimary' : 'bg-accentPrimary/10 text-accentPrimary'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <span>{item.icon}</span>
        {item.name}
      </Link>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 h-full flex-col hidden md:flex fixed left-0 top-0 bottom-0 z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-gray-900">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm ${isTeacher ? 'bg-teacher-gradient' : 'bg-accent-gradient'}`}>P</div>
            <span>Parishram</span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {filteredItems.map(renderNavLink)}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => dispatch(logout())} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom">
        <nav className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px] ${
                  isActive
                    ? isTeacher ? 'text-teacherPrimary' : 'text-accentPrimary'
                    : 'text-gray-400'
                }`}
              >
                <span className={`text-lg ${isActive ? 'scale-110' : ''} transition-transform`}>{item.icon}</span>
                <span className="text-[10px] font-bold truncate">{item.name.split(' ')[0]}</span>
                {isActive && (
                  <div className={`w-1 h-1 rounded-full ${isTeacher ? 'bg-teacherPrimary' : 'bg-accentPrimary'}`}></div>
                )}
              </Link>
            );
          })}
          {/* More menu */}
          <button 
            onClick={() => setMobileOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-gray-400"
          >
            <span className="text-lg">☰</span>
            <span className="text-[10px] font-bold">More</span>
          </button>
        </nav>
      </div>

      {/* Mobile Slide-out Menu (for "More") */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobile}></div>
          
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-[fade-in-up_0.2s_ease-out]">
            <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
              <Link to="/" onClick={closeMobile} className="flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-gray-900">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm ${isTeacher ? 'bg-teacher-gradient' : 'bg-accent-gradient'}`}>P</div>
                <span>Parishram</span>
              </Link>
              <button onClick={closeMobile} className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                ✕
              </button>
            </div>

            {/* User info */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${isTeacher ? 'bg-teacher-gradient' : 'bg-accent-gradient'}`}>
                {(user?.name || 'U').charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{user?.name || 'User'}</p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isTeacher ? 'text-teacherPrimary' : 'text-accentPrimary'}`}>{user?.role || 'student'}</p>
              </div>
            </div>

            <div className="flex-1 py-4 px-4 overflow-y-auto">
              <nav className="flex flex-col gap-1">
                {filteredItems.map(renderNavLink)}
              </nav>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => { dispatch(logout()); closeMobile(); }} 
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

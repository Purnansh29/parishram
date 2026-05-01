import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useSelector, useDispatch } from 'react-redux';
import api from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    city: '',
    class: '',
    board: '',
    exams: '',
    language: ''
  });

  // Fetch real profile data from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setFormData({
          name: data.name || '',
          mobile: data.mobile || '',
          email: data.email || '',
          city: data.city || '',
          class: data.class || '',
          board: data.board || '',
          exams: data.exams || '',
          language: data.language || ''
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // Fallback to Redux state
        setFormData({
          name: user?.name || '',
          mobile: '',
          email: user?.email || '',
          city: '',
          class: '',
          board: '',
          exams: '',
          language: ''
        });
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const { data } = await api.put('/users/profile', formData);
      // Update localStorage auth data with new profile info
      const authData = JSON.parse(localStorage.getItem('auth'));
      if (authData) {
        authData.name = data.name;
        authData.email = data.email;
        localStorage.setItem('auth', JSON.stringify(authData));
      }
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Profile" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Success/Error Messages */}
            {message.text && (
              <div className={`mx-8 mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-100 text-green-600' 
                  : 'bg-red-50 border border-red-100 text-red-600'
              }`}>
                {message.type === 'success' ? '✅' : '❌'} {message.text}
              </div>
            )}

            <div className="flex flex-col md:flex-row">
              {/* Left Column: Avatar & Name */}
              <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center">
                <div className="relative mb-6 group">
                  <div className="w-40 h-40 rounded-full bg-amber-400 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=FFD700&color=fff&size=256`} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                  <button className="absolute bottom-1 right-1 bg-accentPrimary text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.name || 'User'}</h2>
                <div className="bg-amber-50 text-amber-700 px-4 py-1 rounded-full text-sm font-bold border border-amber-100 uppercase tracking-wide">
                  {user?.role || 'Student'}
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-2/3 p-8">
                {/* Level Up Overview */}
                <div className="bg-indigo-50/50 rounded-xl p-5 mb-8 border border-indigo-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900">Level Up Overview</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Total XP</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">0</span>
                        <div className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">XP</div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Highest Level</p>
                      <span className="text-xl font-bold text-gray-900">NA</span>
                    </div>
                  </div>
                </div>

                {/* Profile Detail */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Profile Detail</h3>
                  {!isEditing ? (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-1.5 text-accentPrimary font-bold text-sm hover:underline"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-accentPrimary text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-accentPrimary/90 transition-colors disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                {/* Personal Details */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Personal Details</h4>
                  <div className="grid grid-cols-1 gap-y-4">
                    {[
                      { label: 'Name', name: 'name', type: 'text' },
                      { label: 'Mobile No', name: 'mobile', type: 'text' },
                      { label: 'Email', name: 'email', type: 'email' },
                      { label: 'Living City/Village/Town', name: 'city', type: 'text' },
                    ].map((field) => (
                      <div key={field.name} className="flex flex-col md:flex-row md:items-center">
                        <span className="text-sm font-medium text-gray-500 w-40">{field.label}</span>
                        {isEditing ? (
                          <input 
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                          />
                        ) : (
                          <span className="text-sm font-bold text-gray-900">{formData[field.name] || 'N/A'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Details */}
                <div className="space-y-4">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Academic Details</h4>
                  <div className="grid grid-cols-1 gap-y-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Class</span>
                      {isEditing ? (
                        <select name="class" value={formData.class} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all bg-white">
                          <option value="">Select</option>
                          <option value="10">Class 10</option>
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                          <option value="Dropper">Dropper</option>
                        </select>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.class || 'N/A'}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Board/State Board</span>
                      {isEditing ? (
                        <input type="text" name="board" value={formData.board} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all" />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.board || 'N/A'}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Exams</span>
                      {isEditing ? (
                        <input type="text" name="exams" value={formData.exams} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all" />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.exams || 'N/A'}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Language</span>
                      {isEditing ? (
                        <select name="language" value={formData.language} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all bg-white">
                          <option value="">Select</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Hinglish">Hinglish</option>
                        </select>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.language || 'N/A'}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

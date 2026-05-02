import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useSelector } from 'react-redux';
import api from '../services/api';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', city: '', class: '', board: '', exams: '', language: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setFormData({
          name: data.name || '', mobile: data.mobile || '', email: data.email || '',
          city: data.city || '', class: data.class || '', board: data.board || '',
          exams: data.exams || '', language: data.language || ''
        });
      } catch (error) {
        setFormData({ name: user?.name || '', mobile: '', email: user?.email || '', city: '', class: '', board: '', exams: '', language: '' });
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true); setMessage({ type: '', text: '' });
    try {
      const { data } = await api.put('/users/profile', formData);
      const authData = JSON.parse(localStorage.getItem('auth'));
      if (authData) { authData.name = data.name; authData.email = data.email; localStorage.setItem('auth', JSON.stringify(authData)); }
      setMessage({ type: 'success', text: 'Profile updated successfully!' }); setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' });
    } finally { setSaving(false); }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(); setPasswordMessage({ type: '', text: '' });
    if (passwordData.newPassword !== passwordData.confirmPassword) { setPasswordMessage({ type: 'error', text: 'New passwords do not match' }); return; }
    if (passwordData.newPassword.length < 6) { setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' }); return; }
    setPasswordSaving(true);
    try {
      const { data } = await api.put('/users/change-password', { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
      setPasswordMessage({ type: 'success', text: data.message });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setPasswordMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' });
    } finally { setPasswordSaving(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Profile" />
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

            {message.text && (
              <div className={`mx-4 md:mx-8 mt-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${message.type === 'success' ? 'bg-green-50 border border-green-100 text-green-600' : 'bg-red-50 border border-red-100 text-red-600'}`}>
                {message.type === 'success' ? '✅' : '❌'} {message.text}
              </div>
            )}

            <div className="flex flex-col md:flex-row">
              {/* Left Column: Avatar */}
              <div className="w-full md:w-1/3 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-amber-400 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <img src={`https://ui-avatars.com/api/?name=${formData.name || 'User'}&background=FFD700&color=fff&size=256`} alt="Profile" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <button className="absolute bottom-1 right-1 bg-accentPrimary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{formData.name || 'User'}</h2>
                <div className="bg-amber-50 text-amber-700 px-4 py-1 rounded-full text-sm font-bold border border-amber-100 uppercase tracking-wide">
                  {user?.role || 'Student'}
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-2/3 p-6 md:p-8">
                {/* Level Up */}
                <div className="bg-indigo-50/50 rounded-xl p-4 mb-8 border border-indigo-100">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Level Up Overview</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Total XP</p>
                      <span className="text-lg font-bold text-gray-900">0 <span className="text-[10px] text-gray-400 uppercase">XP</span></span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Highest Level</p>
                      <span className="text-lg font-bold text-gray-900">NA</span>
                    </div>
                  </div>
                </div>

                {/* Profile Detail Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Profile Detail</h3>
                  {!isEditing ? (
                    <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 text-accentPrimary font-bold text-sm hover:underline">✏️ Edit</button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={handleSave} disabled={saving} className="bg-accentPrimary text-white px-4 py-1.5 rounded-lg text-sm font-bold disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
                      <button onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-bold">Cancel</button>
                    </div>
                  )}
                </div>

                {/* Personal Details */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Personal Details</h4>
                  {[
                    { label: 'Name', name: 'name', type: 'text' },
                    { label: 'Mobile No', name: 'mobile', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'City/Town', name: 'city', type: 'text' },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col md:flex-row md:items-center gap-1">
                      <span className="text-sm font-medium text-gray-500 w-40">{field.label}</span>
                      {isEditing ? (
                        <input type={field.type} name={field.name} value={formData[field.name]} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none" />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData[field.name] || 'N/A'}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Academic Details */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Academic Details</h4>
                  {[
                    { label: 'Class', name: 'class', type: 'select', options: ['', '10', '11', '12', 'Dropper'] },
                    { label: 'Board', name: 'board', type: 'text' },
                    { label: 'Exams', name: 'exams', type: 'text' },
                    { label: 'Language', name: 'language', type: 'select', options: ['', 'English', 'Hindi', 'Hinglish'] },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col md:flex-row md:items-center gap-1">
                      <span className="text-sm font-medium text-gray-500 w-40">{field.label}</span>
                      {isEditing ? (
                        field.type === 'select' ? (
                          <select name={field.name} value={formData[field.name]} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 outline-none bg-white">
                            {field.options.map(o => <option key={o} value={o}>{o || 'Select'}</option>)}
                          </select>
                        ) : (
                          <input type="text" name={field.name} value={formData[field.name]} onChange={handleChange} className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 outline-none" />
                        )
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData[field.name] || 'N/A'}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Security: Change Password */}
                <div className="space-y-4">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">🔒 Security</h4>
                  {passwordMessage.text && (
                    <div className={`p-3 rounded-xl flex items-center gap-2 text-sm font-bold ${passwordMessage.type === 'success' ? 'bg-green-50 border border-green-100 text-green-600' : 'bg-red-50 border border-red-100 text-red-600'}`}>
                      {passwordMessage.type === 'success' ? '✅' : '❌'} {passwordMessage.text}
                    </div>
                  )}
                  <form onSubmit={handlePasswordChange} className="space-y-3">
                    {[
                      { label: 'Current Password', key: 'currentPassword', placeholder: 'Enter current password' },
                      { label: 'New Password', key: 'newPassword', placeholder: 'At least 6 characters' },
                      { label: 'Confirm Password', key: 'confirmPassword', placeholder: 'Re-enter new password' },
                    ].map(f => (
                      <div key={f.key} className="flex flex-col md:flex-row md:items-center gap-1">
                        <span className="text-sm font-medium text-gray-500 w-40">{f.label}</span>
                        <input 
                          type="password" required value={passwordData[f.key]}
                          onChange={(e) => setPasswordData(p => ({ ...p, [f.key]: e.target.value }))}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 outline-none"
                          placeholder={f.placeholder}
                        />
                      </div>
                    ))}
                    <div className="pt-2">
                      <button type="submit" disabled={passwordSaving} className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 disabled:opacity-50">
                        {passwordSaving ? 'Changing...' : 'Change Password'}
                      </button>
                    </div>
                  </form>
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

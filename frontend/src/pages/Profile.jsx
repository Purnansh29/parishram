import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useSelector, useDispatch } from 'react-redux';
// import { updateUser } from '../features/auth/authSlice'; // Removed for now as not implemented in real backend yet

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'purnansh',
    mobile: '9274198483',
    email: user?.email || 'purnansh@example.com',
    city: 'N/A',
    class: '12',
    board: 'N/A',
    exams: 'IIT-JEE',
    language: 'N/A'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Note: Profile update API will be implemented in Phase 5
    console.log('Profile update triggered:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || 'purnansh',
      mobile: '9274198483',
      email: user?.email || 'purnansh@example.com',
      city: 'N/A',
      class: '12',
      board: 'N/A',
      exams: 'IIT-JEE',
      language: 'N/A'
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Profile" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Column: Avatar & Name */}
              <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center">
                <div className="relative mb-6 group">
                  <div className="w-40 h-40 rounded-full bg-amber-400 flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <img 
                        src={`https://ui-avatars.com/api/?name=${formData.name}&background=FFD700&color=fff&size=256`} 
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
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.name}</h2>
                <div className="bg-amber-50 text-amber-700 px-4 py-1 rounded-full text-sm font-bold border border-amber-100 uppercase tracking-wide">
                  NA
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
                      <div className="absolute top-2 right-2 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm relative">
                      <p className="text-xs font-semibold text-gray-400 mb-1">Highest Level</p>
                      <span className="text-xl font-bold text-gray-900">NA</span>
                      <div className="absolute top-2 right-2 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
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
                        className="bg-accentPrimary text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-accentPrimary/90 transition-colors"
                      >
                        Save
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
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Name</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{formData.name}</span>
                          <div className="flex items-center gap-1 bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded text-[10px] font-bold border border-indigo-100">
                            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                            PW Student Master
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Mobile No</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="mobile"
                          value={formData.mobile} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.mobile}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Email</span>
                      {isEditing ? (
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.email}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Living City/Village/Town</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="city"
                          value={formData.city} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.city}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Academic Details */}
                <div className="space-y-4">
                  <h4 className="text-[0.75rem] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Academic Details</h4>
                  <div className="grid grid-cols-1 gap-y-4">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Class</span>
                      {isEditing ? (
                        <select 
                          name="class"
                          value={formData.class} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all bg-white"
                        >
                          <option value="10">Class 10</option>
                          <option value="11">Class 11</option>
                          <option value="12">Class 12</option>
                          <option value="Dropper">Dropper</option>
                        </select>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.class}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Board/State Board</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="board"
                          value={formData.board} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.board}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Exams</span>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="exams"
                          value={formData.exams} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all"
                        />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.exams}</span>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center">
                      <span className="text-sm font-medium text-gray-500 w-40">Language</span>
                      {isEditing ? (
                        <select 
                          name="language"
                          value={formData.language} 
                          onChange={handleChange}
                          className="flex-1 max-w-xs border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-accentPrimary/20 focus:border-accentPrimary outline-none transition-all bg-white"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Hinglish">Hinglish</option>
                          <option value="N/A">N/A</option>
                        </select>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formData.language}</span>
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

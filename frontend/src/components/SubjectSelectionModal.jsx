import React from 'react';

const subjects = [
  { id: 1, name: 'Physics', icon: '⚡', color: 'bg-blue-50 text-blue-600', badge: 'Popular' },
  { id: 2, name: 'Chemistry', icon: '🧪', color: 'bg-emerald-50 text-emerald-600' },
  { id: 3, name: 'Mathematics', icon: '📐', color: 'bg-indigo-50 text-indigo-600', badge: 'New' },
  { id: 4, name: 'Biology', icon: '🧬', color: 'bg-green-50 text-green-600' },
  { id: 5, name: 'English', icon: '📚', color: 'bg-amber-50 text-amber-600' },
  { id: 6, name: 'Logical Reasoning', icon: '🧠', color: 'bg-purple-50 text-purple-600' },
  { id: 7, name: 'General Aptitude', icon: '💡', color: 'bg-rose-50 text-rose-600', badge: 'Premium' },
  { id: 8, name: 'Modern Physics', icon: '⚛️', color: 'bg-cyan-50 text-cyan-600' },
];

const SubjectSelectionModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Select Your Subject</h2>
            <p className="text-gray-500 font-medium text-sm mt-1">Pick a subject to start your practice session</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                className="group relative bg-white border border-gray-100 p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all active:scale-[0.98]"
              >
                {subject.badge && (
                  <span className={`absolute -top-2 -right-1 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-white ${subject.badge === 'Premium' ? 'bg-amber-400' : 'bg-blue-600 shadow-sm shadow-blue-600/20'}`}>
                    {subject.badge}
                  </span>
                )}
                <div className={`w-14 h-14 rounded-2xl ${subject.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                  {subject.icon}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {subject.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
            Quick Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectSelectionModal;

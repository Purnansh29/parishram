import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import api from '../../services/api';

const ManageModules = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newModule, setNewModule] = useState({
    title: '',
    type: 'video',
    videoUrl: '',
    duration: '',
    free: false
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data);
      } catch (error) {
        console.error('Failed to fetch course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleAddModule = async (e) => {
    e.preventDefault();
    try {
      // For now, we update the whole course modules array
      const updatedModules = [...(course.modules || []), newModule];
      const { data } = await api.put(`/courses/${id}`, { modules: updatedModules });
      setCourse(data);
      setNewModule({ title: '', type: 'video', videoUrl: '', duration: '', free: false });
    } catch (error) {
      console.error('Failed to add module:', error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teacherPrimary"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title={`Manage Content: ${course?.title}`} />
        <main className="flex-1 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Module List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>📖</span> Curriculum Overview
              </h3>
              
              {course?.modules?.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                  No modules added yet. Use the form on the right to start building your course.
                </div>
              ) : (
                <div className="space-y-4">
                  {course?.modules?.map((mod, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm">
                          {mod.type === 'video' ? '📺' : '📄'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{mod.title}</p>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                            {mod.type} • {mod.duration || mod.pages} {mod.type === 'video' ? 'mins' : 'pages'} • {mod.free ? 'Free' : 'Premium'}
                          </p>
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-red-500 hover:text-red-700 text-sm font-bold">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Add Module Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 sticky top-24">
              <h3 className="text-lg font-black text-gray-900 mb-6">Add New Lesson</h3>
              <form onSubmit={handleAddModule} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Title</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Introduction to Topic..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                    value={newModule.title}
                    onChange={(e) => setNewModule({...newModule, title: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">YouTube URL</label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://youtube.com/watch?v=..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                    value={newModule.videoUrl}
                    onChange={(e) => setNewModule({...newModule, videoUrl: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Duration (m)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="15"
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-teacherPrimary outline-none transition-all"
                      value={newModule.duration}
                      onChange={(e) => setNewModule({...newModule, duration: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1 flex flex-col justify-end pb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-teacherPrimary focus:ring-teacherPrimary border-gray-300 rounded"
                        checked={newModule.free}
                        onChange={(e) => setNewModule({...newModule, free: e.target.checked})}
                      />
                      <span className="text-sm font-bold text-gray-700">Free Preview</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-teacherPrimary text-white rounded-xl font-bold hover:bg-teacherPrimary/90 transition-all shadow-lg mt-4"
                >
                  Add Lesson to Course
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageModules;

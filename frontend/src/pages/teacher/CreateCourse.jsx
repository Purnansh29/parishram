import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import api from '../../services/api';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Physics',
    level: 'Beginner',
    thumbnail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/courses', formData);
      navigate('/dashboard/teacher/courses');
    } catch (error) {
      console.error('Failed to create course:', error);
      alert(error.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="Create New Course" />
        <main className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <div className="bg-teacher-gradient p-8 text-white">
              <h2 className="text-3xl font-black mb-2">Build Your Curriculum</h2>
              <p className="text-indigo-100 font-medium">Define your course details and start sharing your expertise.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Course Title</label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    placeholder="e.g. Advanced Organic Chemistry Mastery"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea 
                    name="description"
                    required
                    rows="4"
                    placeholder="Provide a detailed overview of what students will learn..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Price (INR)</label>
                  <input 
                    type="number" 
                    name="price"
                    required
                    placeholder="e.g. 499"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Category</label>
                  <select 
                    name="category"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all appearance-none bg-white"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Level</label>
                  <select 
                    name="level"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all appearance-none bg-white"
                    value={formData.level}
                    onChange={handleChange}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Thumbnail URL</label>
                  <input 
                    type="url" 
                    name="thumbnail"
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teacherPrimary focus:border-teacherPrimary outline-none transition-all"
                    value={formData.thumbnail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => navigate('/dashboard/teacher/courses')}
                  className="px-6 py-3 text-gray-500 font-bold hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-10 py-3 bg-teacherPrimary text-white rounded-xl font-bold hover:bg-teacherPrimary/90 transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateCourse;

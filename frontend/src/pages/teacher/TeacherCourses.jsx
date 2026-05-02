import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import api from '../../services/api';

const TeacherCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // Fetch only courses created by this teacher
        const { data } = await api.get('/courses');
        // Filter on client side for now, or use a specific teacher endpoint if available
        // Assuming the API returns all but we filter by instructor
        const myCourses = data.filter(c => c.instructor?._id === (user?._id || user?.id));
        setCourses(myCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title="My Created Courses" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Course Management</h2>
              <p className="text-gray-500 text-sm">Manage your curriculum, students, and content.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard/teacher/courses/create')}
              className="px-6 py-3 bg-teacherPrimary text-white rounded-xl font-bold text-sm hover:bg-teacherPrimary/90 transition-all shadow-lg flex items-center gap-2"
            >
              <span>+</span> Create New Course
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teacherPrimary"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses created yet</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">Start sharing your knowledge by creating your first course with modules and lessons.</p>
              <button 
                onClick={() => navigate('/dashboard/teacher/courses/create')}
                className="text-teacherPrimary font-bold hover:underline"
              >
                Create your first course now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-gray-900 uppercase">
                      {course.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-6">{course.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-400 uppercase">Students</p>
                          <p className="text-sm font-black text-gray-900">124</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-bold text-gray-400 uppercase">Modules</p>
                          <p className="text-sm font-black text-gray-900">{course.modules?.length || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => navigate(`/dashboard/teacher/courses/${course._id}/manage`)}
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-teacherPrimary/10 hover:text-teacherPrimary transition-colors"
                          title="Manage Content"
                        >
                          ⚙️
                        </button>
                        <button 
                          className="p-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-teacherPrimary/10 hover:text-teacherPrimary transition-colors"
                          title="Edit Details"
                        >
                          ✏️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TeacherCourses;

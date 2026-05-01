import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { fetchCourses, enrollInCourse, fetchMyCourses } from '../features/courses/courseSlice';

// Real curriculum logic will be added here or fetched from modules field in Course model

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { courses, myCourses, loading, enrollLoading, error } = useSelector((state) => state.courses);
  const course = courses.find(c => c._id === courseId);
  
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
    dispatch(fetchMyCourses());
  }, [dispatch, courses.length]);

  const isEnrolled = myCourses.some(c => c._id === courseId);

  const handleEnroll = async () => {
    if (isEnrolled) {
      // Logic to start learning - maybe scroll to curriculum or play first video
      const firstModule = course?.modules?.[0];
      if (firstModule) setActiveLesson(firstModule);
      return;
    }

    const result = await dispatch(enrollInCourse(courseId));
    if (enrollInCourse.fulfilled.match(result)) {
      dispatch(fetchMyCourses()); // Refresh enrolled list
    }
  };

  if (loading && !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-400">Course not found</h2>
          <Link to="/dashboard" className="mt-4 text-accentPrimary font-bold hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  // Helper stats (placeholders for now until modules are fully implemented in DB)
  const totalLessons = course.modules?.length || 0;
  const totalVideos = course.modules?.filter(l => l.type === 'video').length || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader title={course.title} />
        <main className="flex-1 p-6 lg:p-8">

          {/* Back Button */}
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700 mb-6 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Dashboard
          </Link>

          {/* Course Header */}
          <div className="bg-white rounded-[2rem] border border-gray-100 p-8 lg:p-10 mb-8 shadow-xl shadow-gray-200/40 relative overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-accentPrimary/10 to-purple-500/10 blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-accentPrimary/10 text-accentPrimary text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-accentPrimary/20">{course.category}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    ⭐ 4.8 Rating
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight">{course.title}</h1>
                <p className="text-gray-500 text-lg max-w-2xl mb-6 leading-relaxed">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-bold">
                  <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">👨‍🏫 {course.instructor?.name || 'Expert Faculty'}</span>
                  <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">⏱️ {course.duration || '12 Months'}</span>
                  <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">📚 {totalLessons} Lessons</span>
                  <span className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">🎬 {totalVideos} Videos</span>
                </div>
              </div>
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 text-center min-w-[280px] border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accentPrimary to-purple-500"></div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <p className="text-5xl font-black text-gray-900">₹{course.price.toLocaleString('en-IN')}</p>
                  <div className="text-left">
                    <p className="text-sm text-gray-400 line-through decoration-red-400/50">₹{(course.price * 10).toLocaleString('en-IN')}</p>
                    <span className="inline-block bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-red-200">90% OFF</span>
                  </div>
                </div>
                <button 
                  onClick={handleEnroll}
                  disabled={enrollLoading}
                  className={`w-full mt-6 py-4 text-white font-black text-lg rounded-2xl shadow-lg transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                    isEnrolled 
                      ? 'bg-emerald-500 shadow-emerald-200/50 hover:bg-emerald-600' 
                      : 'bg-accentPrimary shadow-blue-200/50 hover:bg-blue-600'
                  } ${enrollLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {enrollLoading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : isEnrolled ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Start Learning
                    </>
                  ) : 'Enroll Now'}
                </button>
                <p className="text-xs text-gray-400 font-medium mt-4">Includes full lifetime access</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Video Player & Tabs */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Main Player Area */}
              {activeLesson ? (
                <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-200/50">
                  {activeLesson.type === 'video' ? (
                    <>
                      <div className="aspect-video bg-gray-950 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <iframe
                          src={activeLesson.videoUrl}
                          title={activeLesson.title}
                          className="w-full h-full relative z-10"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded border border-blue-100">Video Lesson</span>
                          <p className="text-sm font-bold text-gray-400 flex items-center gap-1">⏱️ {activeLesson.duration}</p>
                        </div>
                        <h3 className="text-2xl font-black text-gray-900">{activeLesson.title}</h3>
                      </div>
                    </>
                  ) : (
                    <div className="p-10 text-center">
                      <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-4 text-4xl">📄</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{activeLesson.title}</h3>
                      <p className="text-gray-400 mb-6">{activeLesson.pages} pages of comprehensive notes</p>
                      <button className="px-8 py-3 bg-accentPrimary text-white rounded-xl font-bold shadow-lg shadow-accentPrimary/20 hover:shadow-xl transition-all">
                        📥 Download PDF
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center shadow-sm">
                  <div className="text-6xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Select a lesson to start</h3>
                  <p className="text-gray-400">Choose a video or notes from the curriculum on the right to begin studying.</p>
                </div>
              )}

              {/* Learning Tools Tabs */}
              {activeLesson && (
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 p-8 lg:p-10">
                  <div className="flex overflow-x-auto border-b border-gray-100 pb-4 mb-8 gap-3 scrollbar-hide">
                    {['Overview', 'Notes', 'Doubts', 'Discussion', 'Quiz', 'Progress'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 ${
                          activeTab === tab
                            ? 'bg-accentPrimary text-white shadow-lg shadow-accentPrimary/30 scale-105'
                            : 'bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content Rendering */}
                  <div className="min-h-[250px]">
                    {/* 1. Overview Tab */}
                    {activeTab === 'Overview' && (
                      <div className="animate-fade-in-up">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">About this lesson</h3>
                        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                          In this comprehensive session, we will cover the core concepts of <span className="font-bold">{activeLesson.title}</span>. Ensure you have your notebooks ready. Pause and practice problems when instructed by the teacher.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex-1">
                            <h4 className="font-bold text-blue-900 mb-1 text-sm">Instructor</h4>
                            <p className="text-blue-700 text-sm">{course.instructor}</p>
                          </div>
                          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex-1">
                            <h4 className="font-bold text-emerald-900 mb-1 text-sm">Prerequisites</h4>
                            <p className="text-emerald-700 text-sm">Previous chapter notes</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. Notes Tab */}
                    {activeTab === 'Notes' && (
                      <div className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-gray-900">Study Materials</h3>
                          <button className="px-4 py-2 bg-accentPrimary/10 text-accentPrimary rounded-lg font-bold text-xs hover:bg-accentPrimary hover:text-white transition-all">Download All PDF</button>
                        </div>
                        <div className="space-y-3">
                          {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-accentPrimary/30 transition-colors cursor-pointer group">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">📄</span>
                                <div>
                                  <p className="font-bold text-gray-800 text-sm group-hover:text-accentPrimary transition-colors">Class Notes - Part {i}</p>
                                  <p className="text-xs text-gray-400">PDF • 2.4 MB</p>
                                </div>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-accentPrimary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 3. Doubts Tab */}
                    {activeTab === 'Doubts' && (
                      <div className="animate-fade-in-up">
                        <div className="bg-gray-50 rounded-xl p-2 flex gap-2 mb-8 border border-gray-100 focus-within:border-accentPrimary/50 focus-within:ring-2 focus-within:ring-accentPrimary/10 transition-all">
                          <input type="text" placeholder="Type your doubt here..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-700" />
                          <button className="px-6 py-2 bg-accentPrimary text-white rounded-lg font-bold text-sm shadow-md hover:bg-accentPrimary/90">Ask</button>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Previous Doubts</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-7 h-7 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-bold">R</div>
                              <span className="text-sm font-bold text-gray-800">Rahul Sharma</span>
                              <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">Sir, can you explain the formula used at 14:20 again?</p>
                            <div className="bg-blue-50/50 p-3 rounded-lg border-l-2 border-accentPrimary">
                              <p className="text-sm text-gray-700"><span className="font-bold text-accentPrimary mr-1">Instructor:</span> Yes Rahul, we used the standard quadratic formula there. Check note page 3 for derivation.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. Discussion Tab */}
                    {activeTab === 'Discussion' && (
                      <div className="animate-fade-in-up text-center py-8">
                        <span className="text-5xl mb-4 block">💬</span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Community Discussion</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">Join thousands of students discussing this topic, sharing study tips, and solving problems together in real-time.</p>
                        <button className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          Join Telegram Community
                        </button>
                      </div>
                    )}

                    {/* 5. Quiz Tab */}
                    {activeTab === 'Quiz' && (
                      <div className="animate-fade-in-up text-center py-6">
                        <span className="text-5xl mb-4 block">🎯</span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Chapter Quiz</h3>
                        <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">Test your understanding of {activeLesson?.title} with a quick 10-question MCQ quiz.</p>
                        <div className="flex justify-center gap-3 mb-8">
                          <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                            <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">Questions</span>
                            <span className="font-black text-gray-800">10</span>
                          </div>
                          <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                            <span className="block text-[10px] text-gray-400 font-bold uppercase mb-0.5">Time</span>
                            <span className="font-black text-gray-800">15 min</span>
                          </div>
                          <div className="bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-100">
                            <span className="block text-[10px] text-amber-500 font-bold uppercase mb-0.5">Reward</span>
                            <span className="font-black text-amber-600">+50 XP</span>
                          </div>
                        </div>
                        <button className="px-8 py-3 bg-accentPrimary text-white rounded-xl font-bold shadow-lg shadow-accentPrimary/20 hover:shadow-xl transition-all hover:-translate-y-0.5">
                          Start Quiz Now
                        </button>
                      </div>
                    )}

                    {/* 6. Progress Tab */}
                    {activeTab === 'Progress' && (
                      <div className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8">
                          <h3 className="text-2xl font-black text-gray-900">Your Learning Journey</h3>
                          <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">Intermediate Level</span>
                        </div>
                        
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 mb-6 shadow-xl shadow-gray-200/30 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-accentPrimary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                          
                          <div className="flex justify-between items-end mb-4 relative z-10">
                            <div>
                              <span className="font-black text-gray-800 text-lg block">Course Completion</span>
                              <p className="text-sm text-gray-500 font-medium mt-1">You've completed <span className="text-gray-900 font-bold">8</span> out of <span className="text-gray-900 font-bold">{totalLessons}</span> lessons.</p>
                            </div>
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accentPrimary to-indigo-600">24%</span>
                          </div>
                          
                          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner relative z-10">
                            <div className="h-full bg-gradient-to-r from-accentPrimary via-blue-500 to-indigo-500 w-[24%] rounded-full relative shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-white shadow-sm border border-orange-100 text-orange-500 rounded-2xl flex items-center justify-center text-3xl">🔥</div>
                            <div>
                              <p className="text-xs font-black text-orange-400 uppercase tracking-widest mb-1">Current Streak</p>
                              <p className="text-3xl font-black text-gray-900">4 Days</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-3xl p-6 flex items-center gap-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-white shadow-sm border border-amber-100 text-amber-500 rounded-2xl flex items-center justify-center text-3xl">⭐</div>
                            <div>
                              <p className="text-xs font-black text-amber-500 uppercase tracking-widest mb-1">XP Earned</p>
                              <p className="text-3xl font-black text-gray-900">1,250</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Curriculum */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden h-fit sticky top-6">
              <div className="p-8 border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                <h3 className="text-2xl font-black text-gray-900 mb-1">📖 Curriculum</h3>
                <p className="text-sm font-bold text-gray-400">{course.modules?.length || 0} Modules • {totalLessons} Lessons</p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[800px] overflow-y-auto scrollbar-hide">
                <div className="p-4 bg-gray-50/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-4">Course Content</p>
                  {course.modules && course.modules.length > 0 ? (
                    course.modules.map((module, index) => (
                      <button
                        key={module._id || index}
                        onClick={() => (isEnrolled || module.free) ? setActiveLesson(module) : null}
                        className={`w-full px-6 py-4 flex items-center gap-4 text-left transition-all rounded-2xl mb-2 ${
                          activeLesson?._id === module._id 
                            ? 'bg-white shadow-md border-l-4 border-accentPrimary' 
                            : 'hover:bg-white hover:shadow-sm border-l-4 border-transparent'
                        } ${(!isEnrolled && !module.free) ? 'opacity-60 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm border ${
                          activeLesson?._id === module._id ? 'bg-blue-50 border-blue-100 text-accentPrimary' : 'bg-white border-gray-100'
                        }`}>
                          {module.type === 'video' ? '▶️' : '📄'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate text-sm mb-0.5 ${activeLesson?._id === module._id ? 'text-accentPrimary' : 'text-gray-700'}`}>{module.title}</p>
                          <p className="text-[11px] font-bold text-gray-400">{module.duration ? `${module.duration} min` : 'Notes'}</p>
                        </div>
                        {(isEnrolled || module.free) ? (
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-md shadow-sm">ACCESS</span>
                        ) : (
                          <span className="text-[10px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-1 rounded-md shadow-sm">🔒 LOCK</span>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-400 text-sm font-medium">No modules added yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;

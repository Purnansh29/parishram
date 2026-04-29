import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

const COURSES_CONTENT = {
  1: {
    title: 'Quantum JEE 2027',
    category: 'JEE',
    price: 499,
    originalPrice: 4999,
    description: 'Complete JEE Main & Advanced preparation with 500+ hours of video lectures, topic-wise notes, and daily practice problems.',
    instructor: 'Dr. Rajesh Verma',
    duration: '12 Months',
    chapters: [
      {
        id: 1, title: 'Mathematics — Algebra', lessons: [
          { id: 1, title: 'Quadratic Equations — Theory', type: 'video', duration: '45 min', videoUrl: 'https://www.youtube.com/embed/ZHkOlKXoH1c', free: true },
          { id: 2, title: 'Quadratic Equations — Practice', type: 'notes', pages: 12, free: true },
          { id: 3, title: 'Complex Numbers', type: 'video', duration: '38 min', videoUrl: 'https://www.youtube.com/embed/SP-YJe7Vldo', free: false },
          { id: 4, title: 'Complex Numbers — Notes PDF', type: 'notes', pages: 18, free: false },
        ]
      },
      {
        id: 2, title: 'Physics — Mechanics', lessons: [
          { id: 5, title: 'Newton\'s Laws of Motion', type: 'video', duration: '52 min', videoUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds', free: true },
          { id: 6, title: 'Work, Energy & Power', type: 'video', duration: '41 min', videoUrl: 'https://www.youtube.com/embed/w4QFJb9a8vo', free: false },
          { id: 7, title: 'Mechanics Formula Sheet', type: 'notes', pages: 8, free: true },
        ]
      },
      {
        id: 3, title: 'Chemistry — Physical', lessons: [
          { id: 8, title: 'Mole Concept & Stoichiometry', type: 'video', duration: '48 min', videoUrl: 'https://www.youtube.com/embed/AsqEkF7hcII', free: true },
          { id: 9, title: 'Atomic Structure', type: 'video', duration: '55 min', videoUrl: 'https://www.youtube.com/embed/LhveTGblGHY', free: false },
          { id: 10, title: 'Physical Chemistry Notes', type: 'notes', pages: 22, free: false },
        ]
      },
    ]
  },
  2: {
    title: 'Astra JEE 2027',
    category: 'JEE',
    price: 599,
    originalPrice: 5999,
    description: 'Dropper batch with intensive revision, PYQ analysis, and mock test series for JEE Main & Advanced.',
    instructor: 'Prof. Ankit Sharma',
    duration: '8 Months',
    chapters: [
      {
        id: 1, title: 'Rapid Revision — Physics', lessons: [
          { id: 1, title: 'Electrostatics Complete', type: 'video', duration: '60 min', videoUrl: 'https://www.youtube.com/embed/ZHkOlKXoH1c', free: true },
          { id: 2, title: 'Electrostatics Notes', type: 'notes', pages: 15, free: true },
        ]
      },
    ]
  },
  3: {
    title: 'Genesis NEET 2027',
    category: 'NEET',
    price: 499,
    originalPrice: 4499,
    description: 'Foundation to advanced NEET preparation covering Biology, Physics, and Chemistry with NCERT-aligned content.',
    instructor: 'Dr. Priya Mehta',
    duration: '12 Months',
    chapters: [
      {
        id: 1, title: 'Biology — Cell Biology', lessons: [
          { id: 1, title: 'Cell Structure & Function', type: 'video', duration: '50 min', videoUrl: 'https://www.youtube.com/embed/URUJD5NEXC8', free: true },
          { id: 2, title: 'Cell Division — Mitosis & Meiosis', type: 'video', duration: '42 min', videoUrl: 'https://www.youtube.com/embed/f-ldPgEfAHI', free: true },
          { id: 3, title: 'NCERT Biology Notes Ch.8', type: 'notes', pages: 20, free: true },
        ]
      },
      {
        id: 2, title: 'Biology — Human Physiology', lessons: [
          { id: 4, title: 'Digestive System', type: 'video', duration: '44 min', videoUrl: 'https://www.youtube.com/embed/ZHkOlKXoH1c', free: false },
          { id: 5, title: 'Breathing & Exchange of Gases', type: 'video', duration: '38 min', videoUrl: 'https://www.youtube.com/embed/ZHkOlKXoH1c', free: false },
        ]
      },
    ]
  },
};

// Fallback for courses 4-6
[4,5,6].forEach(id => {
  if (!COURSES_CONTENT[id]) {
    COURSES_CONTENT[id] = {
      title: id === 4 ? 'BioCore NEET 2027' : id === 5 ? 'Sankalp UPSC 2027' : 'Rajpath UPSC 2027',
      category: id <= 4 ? 'NEET' : 'UPSC',
      price: id <= 4 ? 499 : id === 5 ? 999 : 1299,
      originalPrice: id <= 4 ? 4999 : id === 5 ? 9999 : 12999,
      description: 'Comprehensive preparation with video lectures, notes, and mock tests.',
      instructor: 'Expert Faculty',
      duration: '10 Months',
      chapters: [
        {
          id: 1, title: 'Chapter 1 — Introduction', lessons: [
            { id: 1, title: 'Course Overview', type: 'video', duration: '30 min', videoUrl: 'https://www.youtube.com/embed/ZHkOlKXoH1c', free: true },
            { id: 2, title: 'Study Plan & Notes', type: 'notes', pages: 10, free: true },
          ]
        }
      ]
    };
  }
});

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = COURSES_CONTENT[courseId];
  const [activeLesson, setActiveLesson] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(1);
  const [activeTab, setActiveTab] = useState('Overview');

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

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
  const totalVideos = course.chapters.reduce((sum, ch) => sum + ch.lessons.filter(l => l.type === 'video').length, 0);

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
          <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-accentPrimary/10 text-accentPrimary text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg mb-3">{course.category}</span>
                <h1 className="text-3xl font-black text-gray-900 mb-2">{course.title}</h1>
                <p className="text-gray-500 max-w-xl mb-4">{course.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-medium">
                  <span className="flex items-center gap-1.5">👨‍🏫 {course.instructor}</span>
                  <span className="flex items-center gap-1.5">⏱️ {course.duration}</span>
                  <span className="flex items-center gap-1.5">📚 {totalLessons} Lessons</span>
                  <span className="flex items-center gap-1.5">🎬 {totalVideos} Videos</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center min-w-[200px] border border-gray-100">
                <p className="text-3xl font-black text-gray-900">₹{course.price}</p>
                <p className="text-sm text-gray-400 line-through">₹{course.originalPrice}</p>
                <span className="inline-block bg-red-100 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded mt-1">90% OFF</span>
                <button className="w-full mt-4 py-3 bg-accentPrimary text-white font-bold rounded-xl shadow-lg shadow-accentPrimary/20 hover:shadow-xl transition-all">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Video Player & Tabs */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Main Player Area */}
              {activeLesson ? (
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  {activeLesson.type === 'video' ? (
                    <>
                      <div className="aspect-video bg-gray-900 rounded-t-3xl overflow-hidden">
                        <iframe
                          src={activeLesson.videoUrl}
                          title={activeLesson.title}
                          className="w-full h-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{activeLesson.title}</h3>
                        <p className="text-sm text-gray-400">Duration: {activeLesson.duration}</p>
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

              {/* Learning Tools Tabs (Notes, Doubts, Quiz, Progress) */}
              {activeLesson && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mt-6">
                  <div className="flex overflow-x-auto border-b border-gray-100 pb-4 mb-6 gap-6 scrollbar-hide">
                    {['Overview', 'Notes', 'Doubts', 'Discussion', 'Quiz', 'Progress'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap font-bold text-sm pb-2 border-b-2 transition-colors ${
                          activeTab === tab
                            ? 'border-accentPrimary text-accentPrimary'
                            : 'border-transparent text-gray-400 hover:text-gray-700'
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
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Your Progress</h3>
                        
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-gray-700 text-sm">Course Completion</span>
                            <span className="font-black text-accentPrimary">24%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-accentPrimary to-indigo-500 w-[24%] rounded-full"></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-4 font-medium">You've completed <span className="font-bold text-gray-800">8</span> out of <span className="font-bold text-gray-800">{totalLessons}</span> lessons.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-2xl">🔥</div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Current Streak</p>
                              <p className="text-xl font-black text-gray-800">4 Days</p>
                            </div>
                          </div>
                          <div className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 bg-white shadow-sm">
                            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center text-2xl">⭐</div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">XP Earned</p>
                              <p className="text-xl font-black text-gray-800">1,250</p>
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
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden h-fit">
              <div className="p-6 border-b border-gray-50">
                <h3 className="text-lg font-bold text-gray-900">📖 Curriculum</h3>
                <p className="text-xs text-gray-400 mt-1">{course.chapters.length} Chapters • {totalLessons} Lessons</p>
              </div>
              <div className="divide-y divide-gray-50">
                {course.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <button
                      onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors text-left"
                    >
                      <span className="font-bold text-sm text-gray-800">{chapter.title}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform ${expandedChapter === chapter.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expandedChapter === chapter.id && (
                      <div className="bg-gray-50/30">
                        {chapter.lessons.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => lesson.free ? setActiveLesson(lesson) : null}
                            className={`w-full px-6 py-3 flex items-center gap-3 text-left transition-all text-sm ${
                              activeLesson?.id === lesson.id ? 'bg-accentPrimary/5 border-l-2 border-accentPrimary' : 'hover:bg-gray-50'
                            } ${!lesson.free ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          >
                            <span className="text-base">{lesson.type === 'video' ? '▶️' : '📄'}</span>
                            <div className="flex-1 min-w-0">
                              <p className={`font-medium truncate ${activeLesson?.id === lesson.id ? 'text-accentPrimary' : 'text-gray-700'}`}>{lesson.title}</p>
                              <p className="text-[11px] text-gray-400">{lesson.type === 'video' ? lesson.duration : `${lesson.pages} pages`}</p>
                            </div>
                            {lesson.free ? (
                              <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded">FREE</span>
                            ) : (
                              <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded">🔒 PRO</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetail;

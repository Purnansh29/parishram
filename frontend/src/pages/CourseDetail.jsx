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
            {/* Left - Video Player */}
            <div className="lg:col-span-2 space-y-6">
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

import React, { useState } from 'react';

const COURSES_DATA = [
  {
    id: 1,
    title: 'Quantum JEE 2027',
    category: 'JEE',
    classLevel: 'Class 11',
    language: 'Hinglish',
    status: 'Ongoing',
    startDate: 'Starts 15 May',
    price: 4999,
    originalPrice: 7999,
    discountPercentage: 37,
    bannerGradient: 'from-blue-500 to-indigo-600',
    tags: ['Multiple plans inside'],
  },
  {
    id: 2,
    title: 'Astra JEE 2027',
    category: 'JEE',
    classLevel: 'Dropper',
    language: 'English',
    status: 'Upcoming',
    startDate: 'Starts 20 Jun',
    price: 5499,
    originalPrice: 8999,
    discountPercentage: 38,
    bannerGradient: 'from-cyan-500 to-blue-600',
    tags: [],
  },
  {
    id: 3,
    title: 'Genesis NEET 2027',
    category: 'NEET',
    classLevel: 'Class 11',
    language: 'Hinglish',
    status: 'Ongoing',
    startDate: 'Starts 10 May',
    price: 4499,
    originalPrice: 6999,
    discountPercentage: 35,
    bannerGradient: 'from-emerald-400 to-teal-500',
    tags: ['Multiple plans inside'],
  },
  {
    id: 4,
    title: 'BioCore NEET 2027',
    category: 'NEET',
    classLevel: 'Class 12',
    language: 'Hinglish',
    status: 'Upcoming',
    startDate: 'Starts 25 May',
    price: 4999,
    originalPrice: 7499,
    discountPercentage: 33,
    bannerGradient: 'from-green-400 to-emerald-600',
    tags: [],
  },
  {
    id: 5,
    title: 'Sankalp UPSC 2027',
    category: 'UPSC / CA',
    classLevel: 'Foundation',
    language: 'Hinglish',
    status: 'Ongoing',
    startDate: 'Starts 01 Jun',
    price: 9999,
    originalPrice: 15999,
    discountPercentage: 37,
    bannerGradient: 'from-orange-400 to-red-500',
    tags: ['Multiple plans inside'],
  },
  {
    id: 6,
    title: 'Rajpath UPSC 2027',
    category: 'UPSC / CA',
    classLevel: 'Advanced',
    language: 'English',
    status: 'Upcoming',
    startDate: 'Starts 15 Jul',
    price: 12999,
    originalPrice: 19999,
    discountPercentage: 35,
    bannerGradient: 'from-rose-400 to-pink-600',
    tags: [],
  },
];

const CATEGORIES = ['All', 'JEE', 'NEET', 'UPSC / CA'];

const PopularCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredCourses = COURSES_DATA.filter((course) => {
    if (selectedCategory === 'All') return true;
    return course.category === selectedCategory;
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">Popular Courses</h2>
          <p className="text-gray-500 text-sm mt-1">Explore our premium batches for top competitive exams.</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col h-full"
          >
            {/* Top Banner Image / Gradient */}
            <div className={`h-36 w-full bg-gradient-to-r ${course.bannerGradient} relative p-4 flex flex-col justify-between`}>
              <div className="flex justify-between items-start w-full">
                {course.tags.includes('Multiple plans inside') ? (
                  <span className="bg-white/20 backdrop-blur-md text-white text-[0.7rem] font-bold px-2 py-1 rounded border border-white/30 uppercase tracking-wider">
                    Multiple Plans
                  </span>
                ) : (
                  <div></div>
                )}
                <span className={`text-[0.7rem] font-bold px-2 py-1 rounded uppercase tracking-wider ${course.status === 'Ongoing' ? 'bg-green-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
                  {course.status}
                </span>
              </div>
              <div className="text-white/80 text-sm font-medium flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {course.startDate}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accentPrimary transition-colors duration-200 line-clamp-1">
                {course.title}
              </h3>

              {/* Tags: Class & Language */}
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  {course.classLevel}
                </span>
                <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 5 7.5 5s.988.73 1.256 1.321c.515 1.137.95 2.502 1.214 3.99A10.02 10.02 0 0110 10.5c.348 0 .692.015 1.03.045.264-1.488.699-2.853 1.214-3.99C12.512 5.73 12.974 5 13.5 5s.988.73 1.256 1.321c.515 1.137.95 2.502 1.214 3.99.338-.03.682-.045 1.03-.045.348 0 .692.015 1.03.045a11.944 11.944 0 011.638 2.051 6.002 6.002 0 01-3.57 3.653A10.038 10.038 0 0110 14.5a10.038 10.038 0 01-3.468-1.547 6.002 6.002 0 01-3.57-3.653 11.944 11.944 0 011.638-2.051C4.945 7.42 4.654 7.712 4.332 8.027z" clipRule="evenodd" />
                  </svg>
                  {course.language}
                </span>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-extrabold text-gray-900">₹{course.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-gray-400 line-through font-medium">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="inline-block bg-red-100 text-red-600 text-[0.7rem] font-bold px-2 py-0.5 rounded">
                    {course.discountPercentage}% OFF
                  </span>
                </div>
                
                <button className="flex items-center justify-center gap-1 bg-accentPrimary hover:bg-accentPrimary/90 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
                  Buy Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;

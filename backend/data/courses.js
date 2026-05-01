const courses = [
  {
    title: 'NEET Complete Crash Course 2026',
    description: 'A comprehensive crash course for NEET aspirants. Includes Physics, Chemistry, and Biology modules with mock tests.',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60',
    price: 4999,
    category: 'Medical',
    level: 'Advanced',
    modules: [
      {
        title: 'Physics - Mechanics',
        videoUrl: 'https://www.youtube.com/watch?v=dummy1',
        duration: 120
      },
      {
        title: 'Biology - Cell Structure',
        videoUrl: 'https://www.youtube.com/watch?v=dummy2',
        duration: 90
      }
    ]
  },
  {
    title: 'JEE Main Foundation Batch',
    description: 'Build a strong foundation for JEE Mains. Expert faculty covering Mathematics, Physics, and Chemistry.',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60',
    price: 5999,
    category: 'Engineering',
    level: 'Intermediate',
    modules: [
      {
        title: 'Math - Calculus Fundamentals',
        videoUrl: 'https://www.youtube.com/watch?v=dummy3',
        duration: 150
      }
    ]
  },
  {
    title: 'CUET UG General Test Prep',
    description: 'Crack CUET with our targeted preparation strategy. Covers logical reasoning, general knowledge, and quantitative aptitude.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
    price: 2999,
    category: 'University Entrance',
    level: 'Beginner',
    modules: [
      {
        title: 'Logical Reasoning Basics',
        videoUrl: 'https://www.youtube.com/watch?v=dummy4',
        duration: 60
      }
    ]
  }
];

export default courses;

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';
import Test from './models/Test.js';
import TestAttempt from './models/TestAttempt.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Course.deleteMany();

    // Find the first user to be the instructor (assuming you created one)
    const adminUser = await User.findOne({});

    if (!adminUser) {
      console.error('No user found! Please register an account first via the UI.');
      process.exit(1);
    }

    const sampleCourses = [
      {
        title: 'Complete JEE Physics 2026',
        description: 'Master Physics for JEE 2026 with comprehensive modules on Mechanics, Waves, and Modern Physics.',
        price: 499,
        category: 'Physics',
        level: 'Advanced',
        thumbnail: 'https://placehold.co/800x400/2563eb/ffffff?text=JEE+Physics',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE Maths 2026',
        description: 'Deep dive into Algebra, Calculus, and Coordinate Geometry with advanced problem-solving techniques.',
        price: 499,
        category: 'Mathematics',
        level: 'Advanced',
        thumbnail: 'https://placehold.co/800x400/16a34a/ffffff?text=JEE+Mathematics',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE Chemistry 2026',
        description: 'A complete guide to Physical, Organic, and Inorganic chemistry tailored for JEE 2026 aspirants.',
        price: 499,
        category: 'Chemistry',
        level: 'Advanced',
        thumbnail: 'https://placehold.co/800x400/ea580c/ffffff?text=JEE+Chemistry',
        instructor: adminUser._id,
      },
      {
        title: 'Inorganic Chemistry Masterclass',
        description: 'Master the periodic table, P-block, D-block, and Coordination compounds with logic and ease.',
        price: 499,
        category: 'Chemistry',
        level: 'Intermediate',
        thumbnail: 'https://placehold.co/800x400/ca8a04/ffffff?text=Inorganic+Chemistry',
        instructor: adminUser._id,
      },
      {
        title: 'Organic Chemistry Masterclass',
        description: 'Understand Reaction Mechanisms, Named Reactions, and Stereochemistry like never before.',
        price: 499,
        category: 'Chemistry',
        level: 'Intermediate',
        thumbnail: 'https://placehold.co/800x400/9333ea/ffffff?text=Organic+Chemistry',
        instructor: adminUser._id,
      },
      {
        title: 'Mathematics: Calculus Simplified',
        description: 'From Limits to Differential Equations - learn Calculus through visualization and shortcuts.',
        price: 499,
        category: 'Mathematics',
        level: 'Beginner',
        thumbnail: 'https://placehold.co/800x400/0ea5e9/ffffff?text=Calculus',
        instructor: adminUser._id,
      },
      {
        title: 'Complete Neet Biology prep',
        description: '100% NCERT-based Biology prep covering Botany and Zoology with interactive diagrams.',
        price: 499,
        category: 'Biology',
        level: 'Intermediate',
        thumbnail: 'https://placehold.co/800x400/10b981/ffffff?text=NEET+Biology',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE prep',
        description: 'An all-in-one bundle covering Physics, Chemistry, and Maths for JEE Main & Advanced.',
        price: 499,
        category: 'JEE',
        level: 'Advanced',
        thumbnail: 'https://placehold.co/800x400/4f46e5/ffffff?text=JEE+Complete',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE main prep',
        description: 'Focused batch specifically designed to boost your percentile in JEE Main with target mocks.',
        price: 499,
        category: 'JEE',
        level: 'Intermediate',
        thumbnail: 'https://placehold.co/800x400/0891b2/ffffff?text=JEE+Mains',
        instructor: adminUser._id,
      },
      {
        title: 'For Droppers Batch',
        description: 'Special accelerated program for droppers to master the entire syllabus in one year.',
        price: 499,
        category: 'JEE',
        level: 'Advanced',
        thumbnail: 'https://placehold.co/800x400/be123c/ffffff?text=Droppers+Batch',
        instructor: adminUser._id,
      }
    ];

    const sampleModules = [
      {
        title: 'Introduction to the Course',
        type: 'video',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        duration: 5,
        free: true,
      },
      {
        title: 'Chapter 1: Basic Concepts',
        type: 'video',
        videoUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY', // Placeholder
        duration: 45,
        free: false,
      },
      {
        title: 'Chapter 1: Notes',
        type: 'pdf',
        pages: 12,
        free: false,
      }
    ];

    const coursesWithModules = sampleCourses.map(course => ({
      ...course,
      modules: sampleModules
    }));

    const createdCourses = await Course.insertMany(coursesWithModules);
    
    const sampleTests = [
      {
        title: 'JEE Main 2026 Physics-Specific Mock Test 1',
        description: 'Mock test exclusively for Physics course students.',
        duration: 60,
        totalMarks: 60,
        category: 'JEE Main',
        course: createdCourses[0]._id, // Physics Course
        createdBy: adminUser._id,
        questions: [
          // Physics
          { text: 'A particle moves in a straight line with retardation proportional to its displacement. Its loss of kinetic energy for any displacement x is proportional to:', options: ['x', 'e^x', 'x^2', 'log x'], correctOptionIndex: 2, subject: 'Physics' },
          { text: 'The dimension of magnetic flux is:', options: ['[M L^2 T^-2 A^-1]', '[M L^2 T^-1 A^-1]', '[M L^3 T^-2 A^-2]', '[M L^-2 T^-2 A^-1]'], correctOptionIndex: 0, subject: 'Physics' },
          { text: 'A satellite in a circular orbit of radius R has a period of 4 hours. Another satellite with orbital radius 3R around the same planet will have a period (in hours) of:', options: ['16', '4', '4√2', '12√3'], correctOptionIndex: 3, subject: 'Physics' },
          { text: 'The threshold frequency for a metallic surface corresponds to an energy of 6.2 eV, and the stopping potential for a radiation incident on this surface is 5 V. The incident radiation lies in:', options: ['X-ray region', 'Ultraviolet region', 'Infrared region', 'Visible region'], correctOptionIndex: 1, subject: 'Physics' },
          { text: 'A Carnot engine takes 300 calories of heat from a source at 500 K and rejects 150 calories to a sink. The temperature of the sink is:', options: ['125 K', '250 K', '750 K', '1000 K'], correctOptionIndex: 1, subject: 'Physics' },
          // Chemistry
          { text: 'Which of the following compounds will exhibit geometrical isomerism?', options: ['1-Phenyl-2-butene', '3-Phenyl-1-butene', '2-Phenyl-1-butene', '1,1-Diphenyl-1-propene'], correctOptionIndex: 0, subject: 'Chemistry' },
          { text: 'The hybridization of atomic orbitals of nitrogen in NO2+, NO3-, and NH4+ respectively are:', options: ['sp, sp3, sp2', 'sp2, sp3, sp', 'sp, sp2, sp3', 'sp2, sp, sp3'], correctOptionIndex: 2, subject: 'Chemistry' },
          { text: 'Identify the correct decreasing order of acid strength for the following compounds: (I) Methanoic acid (II) Ethanoic acid (III) Propanoic acid (IV) Butanoic acid', options: ['I > II > III > IV', 'IV > III > II > I', 'I > IV > III > II', 'II > III > IV > I'], correctOptionIndex: 0, subject: 'Chemistry' },
          { text: 'A gas absorbs a photon of 355 nm and emits at two wavelengths. If one of the emissions is at 680 nm, the other is at:', options: ['743 nm', '518 nm', '1035 nm', '325 nm'], correctOptionIndex: 0, subject: 'Chemistry' },
          { text: 'The standard electrode potential (E°) values of Al3+/Al, Ag+/Ag, K+/K, and Cr3+/Cr are -1.66 V, 0.80 V, -2.93 V, and -0.74 V, respectively. The correct decreasing order of reducing power of the metal is:', options: ['Ag > Cr > Al > K', 'K > Al > Cr > Ag', 'K > Al > Ag > Cr', 'Al > K > Ag > Cr'], correctOptionIndex: 1, subject: 'Chemistry' },
          // Mathematics
          { text: 'If the roots of the equation x^2 - px + q = 0 differ by 1, then:', options: ['p^2 = 4q', 'p^2 = 4q + 1', 'p^2 = 4q - 1', 'p^2 = 4q + 2'], correctOptionIndex: 1, subject: 'Mathematics' },
          { text: 'The value of the integral ∫(0 to π/2) [sin(x) / (sin(x) + cos(x))] dx is:', options: ['π/4', 'π/2', 'π', '0'], correctOptionIndex: 0, subject: 'Mathematics' },
          { text: 'If A and B are two mutually exclusive events such that P(A) = 0.5 and P(B) = 0.3, then P(A union B) is:', options: ['0.8', '0.15', '0.2', '1'], correctOptionIndex: 0, subject: 'Mathematics' },
          { text: 'The maximum value of 3cos(x) + 4sin(x) is:', options: ['3', '4', '5', '7'], correctOptionIndex: 2, subject: 'Mathematics' },
          { text: 'The distance of the point (1, 2, 3) from the plane x + y + z = 1 is:', options: ['5/√3', '5', '5/√2', '3/√3'], correctOptionIndex: 0, subject: 'Mathematics' }
        ]
      }
    ];

    // Clear tests and insert sample test
    await Test.deleteMany();
    await TestAttempt.deleteMany();
    await Test.insertMany(sampleTests);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

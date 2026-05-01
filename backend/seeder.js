import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';
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

    await Course.insertMany(coursesWithModules);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

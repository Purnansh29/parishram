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
        price: 4999,
        category: 'Physics',
        level: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1636466484202-2e99137a9d02?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE Maths 2026',
        description: 'Deep dive into Algebra, Calculus, and Coordinate Geometry with advanced problem-solving techniques.',
        price: 4999,
        category: 'Mathematics',
        level: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE Chemistry 2026',
        description: 'A complete guide to Physical, Organic, and Inorganic chemistry tailored for JEE 2026 aspirants.',
        price: 4999,
        category: 'Chemistry',
        level: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1532187875605-1ef6c013bb4d?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Inorganic Chemistry Masterclass',
        description: 'Master the periodic table, P-block, D-block, and Coordination compounds with logic and ease.',
        price: 2499,
        category: 'Chemistry',
        level: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1603126738414-697ebd97d10c?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Organic Chemistry Masterclass',
        description: 'Understand Reaction Mechanisms, Named Reactions, and Stereochemistry like never before.',
        price: 2499,
        category: 'Chemistry',
        level: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Mathematics: Calculus Simplified',
        description: 'From Limits to Differential Equations - learn Calculus through visualization and shortcuts.',
        price: 1999,
        category: 'Mathematics',
        level: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Complete Neet Biology prep',
        description: '100% NCERT-based Biology prep covering Botany and Zoology with interactive diagrams.',
        price: 3999,
        category: 'Biology',
        level: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE prep',
        description: 'An all-in-one bundle covering Physics, Chemistry, and Maths for JEE Main & Advanced.',
        price: 12999,
        category: 'JEE',
        level: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'Complete JEE main prep',
        description: 'Focused batch specifically designed to boost your percentile in JEE Main with target mocks.',
        price: 7999,
        category: 'JEE',
        level: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
        instructor: adminUser._id,
      },
      {
        title: 'For Droppers Batch',
        description: 'Special accelerated program for droppers to master the entire syllabus in one year.',
        price: 14999,
        category: 'JEE',
        level: 'Advanced',
        thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
        instructor: adminUser._id,
      }
    ];

    await Course.insertMany(sampleCourses);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();

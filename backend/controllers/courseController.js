import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';

/**
 * @desc    Fetch all courses
 * @route   GET /api/courses
 * @access  Public
 */
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({}).populate('instructor', 'name photoUrl');
  res.json(courses);
});

/**
 * @desc    Fetch single course
 * @route   GET /api/courses/:id
 * @access  Public
 */
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name photoUrl');

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

/**
 * @desc    Create a course
 * @route   POST /api/courses
 * @access  Private/Teacher/Admin
 */
const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, level, thumbnail } = req.body;

  const course = new Course({
    title,
    description,
    price,
    category,
    level,
    thumbnail: thumbnail || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=60',
    instructor: req.user._id,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

export { getCourses, getCourseById, createCourse };

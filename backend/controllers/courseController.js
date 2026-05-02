import asyncHandler from 'express-async-handler';
import Course from '../models/Course.js';
import User from '../models/User.js';

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

/**
 * @desc    Enroll in a course
 * @route   POST /api/courses/:id/enroll
 * @access  Private
 */
const enrollCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }

  const user = await User.findById(req.user._id);

  // Check if already enrolled
  const isAlreadyEnrolled = user.enrolledCourses.find(
    (id) => id.toString() === course._id.toString()
  );

  if (isAlreadyEnrolled) {
    res.status(400);
    throw new Error('Already enrolled in this course');
  }

  user.enrolledCourses.push(course._id);
  await user.save();

  res.status(200).json({ message: 'Enrolled successfully', courseId: course._id });
});

/**
 * @desc    Get user's enrolled courses
 * @route   GET /api/courses/enrolled
 * @access  Private
 */
const getEnrolledCourses = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'enrolledCourses',
    populate: { path: 'instructor', select: 'name photoUrl' }
  });

  res.json(user.enrolledCourses);
});

/**
 * @desc    Update a course
 * @route   PUT /api/courses/:id
 * @access  Private/Teacher/Admin
 */
const updateCourse = asyncHandler(async (req, res) => {
  const { title, description, price, category, level, thumbnail, modules } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    // Check if user is instructor or admin
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('Not authorized to update this course');
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price !== undefined ? price : course.price;
    course.category = category || course.category;
    course.level = level || course.level;
    course.thumbnail = thumbnail || course.thumbnail;
    course.modules = modules || course.modules;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

export { 
  getCourses, 
  getCourseById, 
  createCourse, 
  updateCourse,
  enrollCourse, 
  getEnrolledCourses 
};

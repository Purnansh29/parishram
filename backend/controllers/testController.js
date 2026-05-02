import asyncHandler from 'express-async-handler';
import Test from '../models/Test.js';
import TestAttempt from '../models/TestAttempt.js';

/**
 * @desc    Fetch all active tests
 * @route   GET /api/tests
 * @access  Private
 */
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({ isActive: true }).select('-questions.correctOptionIndex');
  
  // Mark tests as locked/unlocked based on user's enrolled courses
  const userEnrolledIds = req.user.enrolledCourses.map(id => id.toString());
  
  const processedTests = tests.map(test => {
    const testCourseId = test.course ? test.course.toString() : null;
    const isEnrolled = !testCourseId || userEnrolledIds.includes(testCourseId);
    
    return {
      ...test.toObject(),
      isLocked: !isEnrolled
    };
  });

  res.json(processedTests);
});

/**
 * @desc    Fetch single test by ID
 * @route   GET /api/tests/:id
 * @access  Private
 */
const getTestById = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id).select('-questions.correctOptionIndex');
  
  if (!test) {
    res.status(404);
    throw new Error('Test not found');
  }

  // Check enrollment strictly
  const testCourseId = test.course ? test.course.toString() : null;
  const userEnrolledIds = req.user.enrolledCourses.map(id => id.toString());
  
  const isEnrolled = !testCourseId || userEnrolledIds.includes(testCourseId);
  
  console.log('--- Enrollment Debug ---');
  console.log('Test:', test.title);
  console.log('Course ID Required:', testCourseId);
  console.log('User Enrolled IDs:', userEnrolledIds);
  console.log('Is Access Granted:', isEnrolled);
  console.log('-------------------------');

  if (!isEnrolled) {
    res.status(403);
    throw new Error(`Access Denied: You are not enrolled in the required course for this test.`);
  }

  res.json(test);
});

/**
 * @desc    Submit a test and calculate score
 * @route   POST /api/tests/:id/submit
 * @access  Private
 */
const submitTest = asyncHandler(async (req, res) => {
  const { responses, totalTimeTaken } = req.body;
  const test = await Test.findById(req.params.id);

  if (!test) {
    res.status(404);
    throw new Error('Test not found');
  }

  // Check enrollment
  const isEnrolled = !test.course || req.user.enrolledCourses.some(id => id.toString() === test.course.toString());
  if (!isEnrolled) {
    res.status(403);
    throw new Error('You must enroll in the associated course to submit this test');
  }

  let score = 0;
  let correctCount = 0;
  let attemptedCount = 0;

  const processedResponses = responses.map((response) => {
    const question = test.questions.id(response.questionId);
    
    if (!question) return response;

    let isCorrect = false;

    if (response.selectedOptionIndex !== undefined && response.selectedOptionIndex !== null) {
      attemptedCount++;
      if (response.selectedOptionIndex === question.correctOptionIndex) {
        isCorrect = true;
        score += question.marks;
        correctCount++;
      } else {
        score -= question.negativeMarks;
      }
    }

    return {
      ...response,
      isCorrect,
    };
  });

  const accuracy = attemptedCount === 0 ? 0 : Math.round((correctCount / attemptedCount) * 100);

  const attempt = new TestAttempt({
    user: req.user._id,
    test: test._id,
    score,
    totalTimeTaken,
    status: 'completed',
    responses: processedResponses,
    accuracy
  });

  const savedAttempt = await attempt.save();

  res.status(201).json({
    message: 'Test submitted successfully',
    score,
    accuracy,
    attemptId: savedAttempt._id
  });
});

/**
 * @desc    Get current user's test attempts (for Analytics)
 * @route   GET /api/tests/my-attempts
 * @access  Private
 */
const getMyAttempts = asyncHandler(async (req, res) => {
  const attempts = await TestAttempt.find({ user: req.user._id })
    .populate('test', 'title category totalMarks')
    .sort({ createdAt: 1 }); // Sort chronologically for trend graphs

  res.json(attempts);
});

/**
 * @desc    Get all test attempts (for Teacher/Admin performance tracking)
 * @route   GET /api/tests/analytics/all
 * @access  Private/Teacher/Admin
 */
const getAllAttempts = asyncHandler(async (req, res) => {
  const attempts = await TestAttempt.find({})
    .populate('user', 'name email')
    .populate('test', 'title category totalMarks')
    .sort({ createdAt: -1 });

  res.json(attempts);
});

export { getTests, getTestById, submitTest, getMyAttempts, getAllAttempts };

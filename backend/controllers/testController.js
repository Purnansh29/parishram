import asyncHandler from 'express-async-handler';
import Test from '../models/Test.js';
import TestAttempt from '../models/TestAttempt.js';

/**
 * @desc    Fetch all active tests
 * @route   GET /api/tests
 * @access  Private
 */
const getTests = asyncHandler(async (req, res) => {
  const tests = await Test.find({ isActive: true }).select('-questions.correctOptionIndex'); // Don't send answers!
  res.json(tests);
});

/**
 * @desc    Fetch single test by ID
 * @route   GET /api/tests/:id
 * @access  Private
 */
const getTestById = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.id).select('-questions.correctOptionIndex');
  
  if (test) {
    res.json(test);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
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

export { getTests, getTestById, submitTest, getMyAttempts };

import express from 'express';
import { getTests, getTestById, submitTest, getMyAttempts, getAllAttempts } from '../controllers/testController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTests);

router.get('/my-attempts', protect, getMyAttempts);
router.get('/analytics/all', protect, authorize('teacher', 'admin'), getAllAttempts);

router.route('/:id')
  .get(protect, getTestById);

router.post('/:id/submit', protect, submitTest);

export default router;

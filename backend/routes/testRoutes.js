import express from 'express';
import { getTests, getTestById, submitTest, getMyAttempts } from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTests);

router.get('/my-attempts', protect, getMyAttempts);

router.route('/:id')
  .get(protect, getTestById);

router.post('/:id/submit', protect, submitTest);

export default router;

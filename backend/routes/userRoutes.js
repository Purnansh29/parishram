import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getDashboardStats,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Private routes (logged-in users)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin only routes
router.get('/', protect, authorize('admin'), getUsers);
router.get('/stats', protect, authorize('admin'), getDashboardStats);
router.delete('/:id', protect, authorize('admin'), deleteUser);

export default router;

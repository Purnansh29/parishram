import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  enrollCourse,
  getEnrolledCourses,
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCourses)
  .post(protect, authorize('teacher', 'admin'), createCourse);

router.get('/my-courses', protect, getEnrolledCourses);

router.route('/:id')
  .get(getCourseById)
  .put(protect, authorize('teacher', 'admin'), updateCourse);

router.post('/:id/enroll', protect, enrollCourse);

export default router;

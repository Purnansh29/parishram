import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import courseReducer from '../features/courses/courseSlice';
import testReducer from '../features/tests/testSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    courses: courseReducer,
    tests: testReducer,
  },
});

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk to Fetch All Courses
export const fetchCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async Thunk to Fetch My Enrolled Courses
export const fetchMyCourses = createAsyncThunk(
  'courses/fetchMy',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses/my-courses');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Async Thunk to Enroll in a Course
export const enrollInCourse = createAsyncThunk(
  'courses/enroll',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialState = {
  courses: [],
  myCourses: [],
  loading: false,
  enrollLoading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCourseError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch My Courses
      .addCase(fetchMyCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.myCourses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Enroll
      .addCase(enrollInCourse.pending, (state) => {
        state.enrollLoading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.enrollLoading = false;
        // Optimization: We could push the course to myCourses here if we had the full course object
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.enrollLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCourseError } = courseSlice.actions;
export default courseSlice.reducer;

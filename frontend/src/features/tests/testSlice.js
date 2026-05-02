import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTests = createAsyncThunk(
  'tests/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tests');
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

export const fetchTestById = createAsyncThunk(
  'tests/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/tests/${id}`);
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

export const submitTest = createAsyncThunk(
  'tests/submit',
  async ({ id, attemptData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/tests/${id}/submit`, attemptData);
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

export const fetchMyAttempts = createAsyncThunk(
  'tests/fetchAttempts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/tests/my-attempts');
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

const testSlice = createSlice({
  name: 'tests',
  initialState: {
    tests: [],
    currentTest: null,
    attempts: [],
    loading: false,
    error: null,
    submitSuccess: false,
    submitResult: null
  },
  reducers: {
    clearTestState: (state) => {
      state.currentTest = null;
      state.submitSuccess = false;
      state.submitResult = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tests
      .addCase(fetchTests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.loading = false;
        state.tests = action.payload;
        state.error = null;
      })
      .addCase(fetchTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Single Test
      .addCase(fetchTestById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTest = action.payload;
        state.error = null;
      })
      .addCase(fetchTestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Submit Test
      .addCase(submitTest.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.loading = false;
        state.submitSuccess = true;
        state.submitResult = action.payload;
        state.error = null;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Attempts
      .addCase(fetchMyAttempts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyAttempts.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload;
        state.error = null;
      })
      .addCase(fetchMyAttempts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTestState } = testSlice.actions;
export default testSlice.reducer;

// src/redux/slices/enrolledCoursesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching enrolled courses (Axios)
export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/allEnrollements");
      return response.data.enrolledCourses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk for fetching all courses (Fetch API)
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/allCourses");
      const data = await res.json();
      return data.allCourses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for fetching completed courses (Fetch API)
export const fetchCompletedCourse = createAsyncThunk(
  "courses/fetchCompletedCourse",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/getCompletedCourses");
      const data = await res.json();
      return data.completedCourses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState: {
    enrolledCourses: [],
    allCourses: [],
    completedCourses: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Enrolled
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload || [];
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.allCourses = action.payload || [];
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Completed
      .addCase(fetchCompletedCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.completedCourses = action.payload || [];
      })
      .addCase(fetchCompletedCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default enrolledCoursesSlice.reducer;

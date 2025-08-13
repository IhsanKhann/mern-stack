import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEnrolledCourses = createAsyncThunk(
  "courses/fetchEnrolledCourses",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.auth.user?._id;
      if (!userId) return rejectWithValue("No userId found");

      const response = await axios.get(`/api/allEnrollements/${userId}`);
      console.log("inside the thunk: ", response.data);
      return response.data.enrolledCourses; // ✅ Fix here
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// ✅ Fetch All Courses
export const fetchAllCourses = createAsyncThunk(
  "courses/fetchAllCourses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/allCourses");
      const data = await res.json();
      return data.allCourses || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Fetch Completed Courses
export const fetchCompletedCourse = createAsyncThunk(
  "courses/fetchCompletedCourse",
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) return rejectWithValue("No userId found");

      const response = await axios.get(`/api/getAllCompletedCourses/${userId}`);
      console.log("inside the thunk: ", response.data);
      return response.data.completedCourses.map((e) => e.course); // ✅ Fix here


    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
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
        state.enrolledCourses = action.payload;
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
        state.allCourses = action.payload;
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
        state.completedCourses = action.payload;
      })
      .addCase(fetchCompletedCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default enrolledCoursesSlice.reducer;

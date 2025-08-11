import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import appwriteService from "../../appwrite/service"; // adjust path as needed
import { courseService } from "../../import";
import config from "../../config/config";

const initialState = {
    Enrolledcourses: [],
    CompletedCourses: [],
    loading: false,
    error: null
};

// 👉 THUNK to fetch enrolled courses from Appwrite
export const fetchEnrolledCourses = createAsyncThunk(
  'courses/fetchEnrolledCourses',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.auth.user?.$id;

      if (!userId) {
        throw new Error("User ID is missing");
      }

      const res = await courseService.getEnrolledCourses(userId);
      return res.documents;
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const sliceCourses = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        addToEnrolledCourses: (state, action) => {
            state.Enrolledcourses.push(action.payload);
            console.log(state.Enrolledcourses, "addToEnrolledCourses called in slice");
        },
        addToCompletedCourses: (state, action) => {
            state.CompletedCourses.push(action.payload);
            console.log(state.CompletedCourses, "addToCompletedCourses called in slice");
        },
        removeFromEnrolledCourses: (state, action) => {
            state.Enrolledcourses = state.Enrolledcourses.filter((course) => course.$id !== action.payload);
            console.log(state.Enrolledcourses, "removeFromEnrolledCourses called in slice");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnrolledCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.Enrolledcourses = action.payload;
                console.log("Fetched enrolled courses:", action.payload);
            })
            .addCase(fetchEnrolledCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                console.error("Failed to fetch enrolled courses:", action.payload);
            });
    }
});

export const {
    addToCompletedCourses,
    addToEnrolledCourses,
    removeFromEnrolledCourses
} = sliceCourses.actions;

export default sliceCourses.reducer;

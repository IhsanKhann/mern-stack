import { configureStore } from "@reduxjs/toolkit";
import enrollementReducer from "./sliceEnrollement";

// store here: add reducers.
const store = configureStore({
    reducer: {
        enrolledCourses: enrollementReducer,
    },
});

export default store;
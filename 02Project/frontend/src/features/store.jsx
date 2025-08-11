import { configureStore } from "@reduxjs/toolkit";
import enrollementReducer from "./sliceEnrollement";
import userReducer from "./sliceUser";


// store here: add reducers.
const store = configureStore({
    reducer: {
        enrolledCourses: enrollementReducer,
        user:userReducer,
    },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import enrollementReducer from "./sliceEnrollement";
import authReducer from "./sliceUser";


// store here: add reducers.
const store = configureStore({
    reducer: {
        enrolledCourses: enrollementReducer,
        auth:authReducer,
    },
});

export default store;
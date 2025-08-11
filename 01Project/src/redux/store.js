import {configureStore} from '@reduxjs/toolkit'
import counterReducer from '../features/auth/authSlice'
import courseReducer from '../features/courses/courseSlice'

const store = configureStore({
    reducer:{
        auth:counterReducer,
        courses:courseReducer,
    }
})
export default store;

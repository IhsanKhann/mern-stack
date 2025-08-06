// here we have a state which basically stores the user data
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuthenticated: false,
}

const sliceAuth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        removeUser: (state) => {
            state.user = {};
            state.isAuthenticated = false;
        },
    },
})

export const {setUser, removeUser} = sliceAuth.actions;
export default sliceAuth.reducer;


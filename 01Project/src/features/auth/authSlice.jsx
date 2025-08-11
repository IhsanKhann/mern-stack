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
            console.log(state.user, "setUser called in slice");

        },
        removeUser: (state) => {
            state.user = {};
            state.isAuthenticated = false;
            console.log(state.user,"remove user called in slice");

        },
    },
})

export const {setUser, removeUser} = sliceAuth.actions;
export default sliceAuth.reducer;


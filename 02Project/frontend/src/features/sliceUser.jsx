import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    User:null,
    isAuthenticated:false,

    loading:false,
    error:null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            state.User = action.payload;
            state.isAuthenticated = true;
        },
        clearUser:(state) => {
            state.User = null;
            state.isAuthenticated = false;
        }
    }
})

export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;

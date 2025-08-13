// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "../apis/api"; // adjust path if needed

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  const res = await api.post("/login", { email, password });
  // backend sends:
  // { 
    // success: true, 
    // data: { user, token }
  // }
  return res.data.data;
});

export const signup = createAsyncThunk("auth/signup", async ({ name, email, password }, thunkAPI) => {
  const res = await api.post("/signup", { name, email, password });
  return res.data.data;
});

export const getUser = createAsyncThunk("auth/getUser", async (_, { getState }) => {
  const res = await api.get("/getUser");
  return res.data.user;
});

const savedUser = localStorage.getItem("user");
const initialState = {
  user: savedUser,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthToken(null);
    },
    setCredentials(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;

        s.user = a.payload.user;
        s.token = a.payload.token;
        

        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("user", JSON.stringify(a.payload.user));

        setAuthToken(a.payload.token);
        // yet to study.
      })
      .addCase(login.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(signup.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(signup.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.token = a.payload.token;
        localStorage.setItem("token", a.payload.token);
        localStorage.setItem("user", JSON.stringify(a.payload.user));
        setAuthToken(a.payload.token);
      })
      .addCase(signup.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      .addCase(getUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(getUser.fulfilled, (s, a) => { s.loading = false; s.user = a.payload; })
      .addCase(getUser.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  }
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  errorMsg: null,
  isError: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
    setError: (state, action) => {
      state.errorMsg = action.payload.errorMsg;
    },
    setIsError: (state) => {
      state.isError = true;
    },
    setNotIsError: (state) => {
      state.isError = false;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
  },
});

export const {
  setLogin,
  setLogOut,
  setError,
  setIsError,
  setNotIsError,
  setPosts,
} = authSlice.actions;
export default authSlice.reducer;

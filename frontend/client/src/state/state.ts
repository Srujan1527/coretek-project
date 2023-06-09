import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  errorMsg: null,
  isError: false,
  successMsg: null,
  // allComments: [],
  // postComments:[]
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
      state.errorMsg = null;
      state.isError = false;
      state.posts = [];
    },
    setError: (state, action) => {
      state.errorMsg = action.payload.errorMsg;
    },
    setSuccessMsg: (state, action) => {
      state.successMsg = action.payload.successMsg;
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
    // setAllComments: (state, action) => {
    //   state.allComments=action.payload.comments

    // },
    // setPostComments:(state,action)=>{
    //   const { comments, postId } = action.payload;
    //   const filteredComments = comments.filter(
    //     (comment: any) => comment.post_id === postId
    //   );
    //   state.postComments = filteredComments;

    // }
  },
});

export const {
  setLogin,
  setLogOut,
  setError,
  setIsError,
  setNotIsError,
  setPosts,
  setSuccessMsg,
  // setAllComments,
  // setPostComments,
} = authSlice.actions;
export default authSlice.reducer;

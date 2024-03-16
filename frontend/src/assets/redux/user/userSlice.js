import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    Start: state => {
      state.loading = true;
     
    },
    Success: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    Failure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      
    },
    signOut: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    deleteAcc: (state) => {
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
  },
});

export const { Start, Success, Failure,signOut ,deleteAcc} = userSlice.actions;

export default userSlice.reducer;

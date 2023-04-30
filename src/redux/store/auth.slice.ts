import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isLoggedIn: boolean;
  user_id: number;
}

const initialState: authState = {
  isLoggedIn: false,
  user_id: -1
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

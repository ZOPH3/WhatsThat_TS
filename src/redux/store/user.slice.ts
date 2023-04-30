import { createSlice } from "@reduxjs/toolkit";

interface userState {
  user_id: number,
  first_name: string,
  last_name: string,
  email: string
}

const initialState: userState = {
    user_id: -1,
    first_name: '',
    last_name: '',
    email: ''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

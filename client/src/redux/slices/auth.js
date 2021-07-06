import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // START LOADING
    userLoading(state, action) {
      state.isLoading = true;
    },

    loginSuccess(state, action) {
      state.user = action.payload.userData;
      state.isLoading = false;
      state.isAuthenticated = true;
    },

    hasError(state, action) {
      localStorage.removeItem('token');
      state = {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false,
        user: null
      };
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function setUser(user) {
  return async (dispatch) => {
    dispatch(slice.actions.userLoading());
    try {
      const userData = {
        email: user.email,
        name: user.name
      };
      dispatch(slice.actions.loginSuccess({ userData }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

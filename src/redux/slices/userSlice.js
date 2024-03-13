import { createSlice } from "@reduxjs/toolkit";
import {
  createUserData,
  deleteUserData,
  fetchUserData,
  updateUserData,
} from "../actions/userActions";

const initialState = {
  isLoading: false,
  isUpdating: false,
  isCreating: false,
  isDeleting: false,
  isLoadingSuccess: false,
  isUpdatingSuccess: false,
  isCreatingSuccess: false,
  isDeletingSuccess: false,
  loadingError: null,
  creatingError: null,
  updatingError: null,
  deletingError: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isCreating = false;
      state.isCreatingSuccess = false;
      state.creatingError = null;
      state.isUpdating = false;
      state.isUpdatingSuccess = false;
      state.updatingError = null;
      state.isDeleting = false;
      state.isDeletingSuccess = false;
      state.deletingError = null;
      state.isLoading = false;
      state.isLoadingSuccess = false;
      state.loadingError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loadingError = null;
      state.isLoadingSuccess = true;
      state.users = action.payload;
    });
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingError = action.payload;
    });
    builder.addCase(createUserData.fulfilled, (state, action) => {
      state.isCreating = false;
      state.creatingError = null;
      state.isCreatingSuccess = true;
      state.users = [...state.users, { ...action.payload }];
    });
    builder.addCase(createUserData.pending, (state, action) => {
      state.isCreating = true;
    });
    builder.addCase(createUserData.rejected, (state, action) => {
      state.isCreating = false;
      state.creatingError = action.payload;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.isUpdating = false;
      state.updatingError = null;
      state.isUpdatingSuccess = true;
      state.users = state.users.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });
    builder.addCase(updateUserData.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.isUpdating = false;
      state.updatingError = action.payload;
    });
    builder.addCase(deleteUserData.fulfilled, (state, action) => {
      state.isDeleting = false;
      state.deletingError = null;
      state.isDeletingSuccess = true;
      state.users = state.users.filter((item) => item._id !== action.payload);
    });
    builder.addCase(deleteUserData.pending, (state, action) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteUserData.rejected, (state, action) => {
      state.isDeleting = false;
      state.deletingError = action.payload;
    });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  changeUserStatus,
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
  isChangingStatus: false,
  isLoadingSuccess: false,
  isUpdatingSuccess: false,
  isCreatingSuccess: false,
  isDeletingSuccess: false,
  isStatusChanged: false,
  loadingError: '',
  creatingError: '',
  updatingError: '',
  deletingError: '',
  statusChangedError: '',
  pageNo: 1,
  pages: null,
  users: [],
  totalCount: null, 
  disable: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isCreating = false;
      state.isCreatingSuccess = false;
      state.creatingError = '';
      state.isUpdating = false;
      state.isUpdatingSuccess = false;
      state.updatingError = '';
      state.isDeleting = false;
      state.isDeletingSuccess = false;
      state.deletingError = '';
      state.isLoading = false;
      state.isLoadingSuccess = false;
      state.loadingError = '';
      state.isChangingStatus = false;
      state.isStatusChanged = false;
      state.statusChangedError = '';
      state.disable = false
    },
    setAllDisable: (state, action) => {
      state.disable = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loadingError = "";
      state.isLoadingSuccess = true;
      state.users = action.payload.users;
      state.pageNo = action.payload.pageNo;
      state.pages = action.payload.pages;
      state.totalCount = action.payload.totalCount;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isLoading = false;
      state.loadingError = action.payload;
    });
    builder.addCase(createUserData.pending, (state, action) => {
      state.isCreating = true;
    });
    builder.addCase(createUserData.fulfilled, (state, action) => {
      state.isCreating = false;
      state.creatingError = '';
      state.isCreatingSuccess = true;
      state.users = [...state.users, { ...action.payload }];
    });
    builder.addCase(createUserData.rejected, (state, action) => {
      state.isCreating = false;
      state.creatingError = action.payload;
    });
    builder.addCase(updateUserData.pending, (state, action) => {
      state.isUpdating = true;
    });
    builder.addCase(updateUserData.fulfilled, (state, action) => {
      state.isUpdating = false;
      state.updatingError = "";
      state.isUpdatingSuccess = true;
      state.users = state.users.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    });
    builder.addCase(updateUserData.rejected, (state, action) => {
      state.isUpdating = false;
      state.updatingError = action.payload;
    });
    builder.addCase(deleteUserData.pending, (state, action) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteUserData.fulfilled, (state, action) => {
      state.isDeleting = false;
      state.deletingError = "";
      state.isDeletingSuccess = true;
      state.users = state.users.filter((item) => item._id !== action.payload);
      // console.log(state.isDeletingSuccess)
    });
    builder.addCase(deleteUserData.rejected, (state, action) => {
      state.isDeleting = false;
      state.deletingError = action.payload;
    });
    builder.addCase(changeUserStatus.pending, (state, action) => {
      state.isChangingStatus = true;
    });
    builder.addCase(changeUserStatus.fulfilled, (state, action) => {
      state.isChangingStatus = false;
      state.statusChangedError = "";
      state.isStatusChanged = true;
      state.users = state.users.map((item) => item._id === action.payload ? { ...item, isActive: !item.isActive } : item);
    });
    builder.addCase(changeUserStatus.rejected, (state, action) => {
      state.isChangingStatus = false;
      state.statusChangedError = action.payload;
    });
  },
});

export const { reset, setAllDisable } = userSlice.actions;
export default userSlice.reducer;

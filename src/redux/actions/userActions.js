import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async (pageNo = 1, keyword = "", { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/user/get?pageNo=${pageNo}&keyword=${keyword}`);
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message)
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUserData = createAsyncThunk(
  "createUserData",
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/admin/user/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message)

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "updateUserData",
  async ({ userId, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:3000/admin/user/update/${userId}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json", // Add this header for JSON data
          },
          body: JSON.stringify(data.data),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message)
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserData = createAsyncThunk(
  "deleteUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/user/delete/${userId}`, {
        method: "delete",
      });
      if (!res.ok) throw new Error(result?.message)
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "changedUserStatus",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/admin/user/change/${userId}`, {
        method: "put",
      });
      if (!res.ok) throw new Error(result?.message)
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

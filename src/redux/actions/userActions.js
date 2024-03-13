import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const res = await fetch("https://server-vtmg.onrender.com/admin/user/get");
  return res.json();
});

export const createUserData = createAsyncThunk(
  "createUserData",
  async (data) => {
    const res = await fetch("https://server-vtmg.onrender.com/admin/user/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }
);

export const updateUserData = createAsyncThunk(
  "updateUserData",
  async ({ userId, data }) => {
    const res = await fetch(
      `https://server-vtmg.onrender.com/admin/user/update/${userId}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json", // Add this header for JSON data
        },
        body: JSON.stringify(data.data),
      }
    );
  }
);

export const deleteUserData = createAsyncThunk(
  "deleteUserData",
  async (userId) => {
    await fetch(`https://server-vtmg.onrender.com/admin/user/delete/${userId}`, {
      method: "delete",
    });
    return userId;
  }
);

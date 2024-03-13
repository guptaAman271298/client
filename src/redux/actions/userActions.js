import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const res = await fetch("http://localhost:3000/admin/user/get");
  return res.json();
});

export const createUserData = createAsyncThunk(
    "createUserData",
    async (data) => {
      const res = await fetch("http://localhost:3000/admin/user/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res)
      if (!res.ok) { // Check if the response is not successful
        throw new Error("Failed to create user"); // Throw an error
      }
      return res.json();
    }
  );

export const updateUserData = createAsyncThunk(
  "updateUserData",
  async ({ userId, data }) => {
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
  }
);

export const deleteUserData = createAsyncThunk(
  "deleteUserData",
  async (userId) => {
    await fetch(`http://localhost:3000/admin/user/delete/${userId}`, {
      method: "delete",
    });
    return userId;
  }
);

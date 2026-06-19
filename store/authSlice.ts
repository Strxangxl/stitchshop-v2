import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../app/utils/api";
import { IUserSession } from "../app/types"; // Updated import

interface AuthState {
  userInfo: IUserSession | null; // Updated
  loading: boolean;
  error: string | null;
}

// Check localStorage for an existing user session on initialization
const isServer = typeof window === "undefined";
const initialUserInfo =
  !isServer && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null;

const initialState: AuthState = {
  userInfo: initialUserInfo,
  loading: false,
  error: null,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: Pick<IUserSession, "email"> & { password: string },
    thunkAPI,
  ) => {
    // Updated
    try {
      const response = await apiClient.post<IUserSession>(
        "/auth/login",
        credentials,
      ); // Updated
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Async Thunk for Registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    userData: Pick<IUserSession, "name" | "email"> & { password: string },
    thunkAPI,
  ) => {
    // Updated
    try {
      const response = await apiClient.post<IUserSession>(
        "/auth/register",
        userData,
      ); // Updated
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Login Lifecycle Actions ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<IUserSession>) => {
          // Updated
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- Register Lifecycle Actions ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<IUserSession>) => {
          // Updated
          state.loading = false;
          state.userInfo = action.payload;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;

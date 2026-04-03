import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apis from "../../pages/loginLogout/utils/apisUsers";
import httpAction from "../../services/httpAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async () => {
    const data = {
      url: apis().userProfile,
    };

    const result = await httpAction(data);
    if (result?.status) {
      return result.user;
    }

    throw new Error("Failed to fetch user");
  },

);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const data = {
        url: apis().checkAuth,
      };

      const result = await httpAction(data);

      // 🔥 match backend response
      if (result?.success) {
        return result.user; // this will go to fulfilled case
      }

      return rejectWithValue(result?.message || "Authentication failed");
    } catch (error) {
      return rejectWithValue(
        error.message || "Something went wrong"
      );
    }
  }
);





const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;




/*
dispatch(fetchUserProfile())
        ↓
pending → loading = true
        ↓
API call
        ↓
return result.user
        ↓
fulfilled → action.payload
        ↓
state.user = action.payload ✅
*/
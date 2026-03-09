import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // aapka axios instance

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

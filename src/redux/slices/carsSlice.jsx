import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (params, thunkAPI) => {
    try {
      const response = await api.get("/cars", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    totalPages: 0,
    currentPage: 1,
    filters: {
      brand: "",
      price: "",
      miLeageFrom: "",
      miLeageTo: "",
    },
  },
  reducer: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.items = [];
      state.currentPage = 1;
    },
    resetCars(state) {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.currentPage = 1;
    },
    incrementPage(state) {
      state.currentPage += 1;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.data];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, resetCars, incrementPage } = carsSlice.actions;

export default carsSlice.reducer;

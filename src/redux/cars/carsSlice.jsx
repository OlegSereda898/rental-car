import { createSlice } from "@reduxjs/toolkit";
import { fetchCarById, fetchCars } from "./carsOperations";

const initialState = {
  items: [],
  page: 1,
  status: "idle",
};

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    totalPages: 0,
    currentPage: 1,
    selectedCar: null,
    filters: {
      brand: "",
      price: "",
      mileageFrom: "",
      mileageTo: "",
    },
  },
  reducers: {
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
    setSelectedCar(state, action) {
      state.selectedCar = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cars = action.payload.cars;

        if (action.meta.arg.isLoadMore) {
          state.currentPage += 1;
          state.items = [...state.items, ...cars];
        } else {
          state.currentPage = 1;
          state.items = cars;
        }
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchCarById.pending, (state) => {
        state.status = "loading";
        state.selectedCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFilters, resetCars, incrementPage, setSelectedCar } =
  carsSlice.actions;

export default carsSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page = 1, filters, isLoadMore = false }, thunkApi) => {
    try {
      const params = {
        page,
        limit: 12,
        ...(filters.make && { make: filters.make }),
        ...(filters.rentalPrice && { rentalPrice: filters.rentalPrice }),
        ...(filters.mileageFrom && { mileageFrom: filters.mileageFrom }),
        ...(filters.mileageTo && { mileageTo: filters.mileageTo }),
      };

      const response = await axios.get(
        "https://car-rental-api.goit.global/cars",
        { params }
      );

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (carId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://car-rental-api.goit.global/cars/${carId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllCars = createAsyncThunk(
  "cars/fetchAllCars",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/cars"
      );
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

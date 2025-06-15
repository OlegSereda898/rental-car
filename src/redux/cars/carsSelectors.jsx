import { createSelector } from "@reduxjs/toolkit";

export const selectAllCars = (state) => state.cars.items;

export const selectFilters = (state) => state.cars.filters;

export const selectIsLoading = (state) => state.cars.status === "loading";

export const selectPage = (state) => state.cars.currentPage;

export const selectSelectedCar = (state) => state.cars.selectedCar;

export const selectFilteredCars = createSelector(
  [selectAllCars, selectFilters],
  (cars, filters) => {
    if (!Array.isArray(cars)) return [];

    return cars.filter((car) => {
      const matchBrand =
        !filters.brand ||
        car.brand?.toLowerCase() === filters.brand.toLowerCase();

      const matchPrice =
        !filters.price || Number(car.rentalPrice) <= Number(filters.price);

      const matchMileageFrom =
        !filters.mileageFrom || car.mileage >= Number(filters.mileageFrom);

      const matchMileageTo =
        !filters.mileageTo || car.mileage <= Number(filters.mileageTo);

      return matchBrand && matchPrice && matchMileageFrom && matchMileageTo;
    });
  }
);

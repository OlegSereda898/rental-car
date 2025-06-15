import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/cars/carsSlice";
import { selectAllCars, selectIsLoading } from "../../redux/cars/carsSelectors";
import { getUniqueBrands } from "../../utils/getUniqueBrands";
import css from "./FilterForm.module.css";
import { fetchAllCars } from "../../redux/cars/carsOperations";
import { useEffect, useState } from "react";

const FilterForm = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const cars = useSelector(selectAllCars);
  const isLoading = useSelector(selectIsLoading);
  const brands = getUniqueBrands(cars);

  const [mileageFrom, setMileageFrom] = useState("");
  const [mileageTo, setMileageTo] = useState("");

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const formatNumber = (value) =>
    value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";

  const parseNumber = (value) => value.replaceAll(",", "");

  const handleMileageChange = (setter) => (e) => {
    const raw = e.target.value.replace(/[^\d]/g, "");
    setter(raw);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      brand: e.target.make.value.trim(),
      price: e.target.rentalPrice.value,
      mileageFrom: parseNumber(mileageFrom),
      mileageTo: parseNumber(mileageTo),
    };

    dispatch(setFilters(filters));
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.field}>
        <label htmlFor="make" className={css.label}>
          Car brand
        </label>
        <select name="make" id="make" className={css.select}>
          <option value="">Choose a brand</option>

          {isLoading ? (
            <option disabled>Loading...</option>
          ) : brands.length > 0 ? (
            brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))
          ) : (
            <option disabled>No brands available</option>
          )}
        </select>
      </div>

      <div className={css.field}>
        <label htmlFor="rentalPrice" className={css.label}>
          Price / 1 hour
        </label>
        <select name="rentalPrice" id="rentalPrice" className={css.select}>
          <option value="">Choose a price</option>
          {[...Array(10)].map((_, index) => {
            const price = (index + 1) * 10;
            return (
              <option key={price} value={price}>
                {price}
              </option>
            );
          })}
        </select>
      </div>

      <div className={css.field}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageInputs}>
          <input
            type="text"
            name="mileageFrom"
            placeholder="From"
            value={formatNumber(mileageFrom)}
            onChange={handleMileageChange(setMileageFrom)}
            className={css.inputFrom}
          />
          <input
            type="text"
            name="mileageTo"
            placeholder="To"
            value={formatNumber(mileageTo)}
            onChange={handleMileageChange(setMileageTo)}
            className={css.inputTo}
          />
        </div>
      </div>

      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
};

export default FilterForm;

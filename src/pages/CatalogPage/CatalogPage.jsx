import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CarsList from "../../components/CarsList/CarsList";
import { selectFilters } from "../../redux/filters/filtersSelectors";
import FilterForm from "../../components/FilterForm/FilterForm";
import {
  selectFilteredCars,
  selectPage,
  selectIsLoading,
} from "../../redux/cars/carsSelectors";
import { fetchCars } from "../../redux/cars/carsOperations";
import { resetCars } from "../../redux/cars/carsSlice";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const cars = useSelector(selectFilteredCars);
  const page = useSelector(selectPage);
  const status = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(resetCars());
    dispatch(fetchCars({ page: 1, filters }));
  }, [dispatch]);

  const handleFilterSubmit = () => {
    dispatch(resetCars());
    dispatch(fetchCars({ page: 1, filters }));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(fetchCars({ page: nextPage, filters, isLoadMore: true }));
  };

  return (
    <div className={css.container}>
      <FilterForm onSubmit={handleFilterSubmit} />
      {status === "loading" && <Loader />}
      <CarsList cars={cars} />
      {cars.length > 0 && cars.length % 12 === 0 && (
        <button
          type="button"
          className={css.button}
          onClick={handleLoadMore}
          disabled={status === "loading"}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CatalogPage;

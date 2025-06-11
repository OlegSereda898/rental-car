import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, incrementPage } from "../redux/slices/carsSlice";
import Loader from "../components/Loader/Loader";
import CarsList from "../components/CarsList/CarsList";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, status, error, filters, currentPage, totalPages } =
    useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars({ ...filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      dispatch(incrementPage());
    }
  };

  return (
    <section>
      <h1>Catalog</h1>

      {status === "Loading" && <Loader />}
      {status === "failed" && <p>{error}</p>}

      <CarsList cars={items} />

      {status === "succeeded" && currentPage < totalPages && (
        <button onClick={handleLoadMore}>Load more</button>
      )}
    </section>
  );
};

export default CatalogPage;

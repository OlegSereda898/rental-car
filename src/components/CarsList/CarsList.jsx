import { useSelector } from "react-redux";
import CarCard from "../CarCard/CarCard";
import css from "./CarsList.module.css";
import {
  selectIsLoading,
  selectFilteredCars,
} from "../../redux/cars/carsSelectors";
import Loader from "../Loader/Loader";

const CarsList = () => {
  const isLoading = useSelector(selectIsLoading);
  const filteredCars = useSelector(selectFilteredCars);

  if (isLoading) return <Loader />;
  if (!filteredCars.length) return <p className={css.text}>No cars found</p>;

  return (
    <ul className={css.carsList}>
      {filteredCars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarsList;

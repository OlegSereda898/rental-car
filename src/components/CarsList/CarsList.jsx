import CarCard from "../CarCard/CarCard";
import css from "./CarsList.module.css";

const CarsList = ({ cars }) => {
  if (!cars.length) return <p>No cars found</p>;

  return (
    <ul className={css.carsList}>
      {cars.map((car) => (
        <li key={car._id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarsList;

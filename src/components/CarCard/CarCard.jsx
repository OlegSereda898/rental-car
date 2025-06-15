import { Link } from "react-router-dom";
import css from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    mileage,
    rentalCompany,
    type,
    fuelConsumption,
    engineSize,
  } = car;

  const city = address.split(",")[1]?.trim() || address;
  const country = address.split(",")[2]?.trim();
  const mileageFormatted = mileage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={css.carCard}>
      <img
        src={img}
        alt={`${brand} ${model}`}
        loading="lazy"
        className={css.image}
      />

      <div className={css.header}>
        <h3 className={css.title}>
          {brand} <span className={css.model}>{model}</span>, {year}
        </h3>
        <span className={css.price}>{rentalPrice}$</span>
      </div>

      <ul className={css.infoList}>
        <li>{city}</li>
        <li>{country}</li>
        <li>{rentalCompany}</li>
        <li>{type}</li>
        <li>{model}</li>
        <li>{mileageFormatted} km</li>
        <li>{fuelConsumption}</li>
        <li>{engineSize}</li>
      </ul>

      <Link to={`/catalog/${id}`} className={css.readMoreBtn}>
        Read more
      </Link>
    </div>
  );
};

export default CarCard;

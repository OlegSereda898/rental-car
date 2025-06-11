import { Link } from "react-router-dom";
import css from "./CarCard.module.css";

const CarCard = ({ car }) => {
  const {
    _id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    miLeage,
    rentalCompany,
  } = car;

  return (
    <div className={css.carCard}>
      <img src={img} alt={`${brand} ${model}`} />
      <h3>
        {brand} <span>{model}</span> {year}
      </h3>

      <ul>
        <li>{address}</li>
        <li>{rentalCompany}</li>
        <li>MiLeage: {miLeage.toLocaleString("en-US")} km</li>
      </ul>

      <p>
        Price: <strong>{rentalPrice}</strong>
      </p>

      <Link to={`/catalog/${_id}`}>
        <button>Read more</button>
      </Link>
    </div>
  );
};

export default CarCard;

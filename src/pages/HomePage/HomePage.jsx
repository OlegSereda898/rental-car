import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.info}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <button className={css.button}>
          <Link className={css.nameBtn} to="/catalog">
            View Catalog
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;

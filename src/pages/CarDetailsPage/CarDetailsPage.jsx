import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCarById } from "../../redux/cars/carsOperations";
import { selectSelectedCar } from "../../redux/cars/carsSelectors";
import Loader from "../../components/Loader/Loader";
import css from "./CarDetailsPage.module.css";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const car = useSelector(selectSelectedCar);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (!car) return <Loader />;

  const {
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    type,
    fuelConsumption,
    engineSize,
    functionalities,
    accessories,
    mileage,
    rentalConditions,
    description,
  } = car;

  const mileageFormatted = mileage.toLocaleString("en-US");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, date } = e.target.elements;
    alert(
      `Rental request submitted!\nName: ${name.value}\nEmail: ${email.value}\nDate: ${date.value}`
    );
    e.target.reset();
  };

  return (
    <div className={css.wrapper}>
      <button className={css.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className={css.container}>
        <div className={css.lContainer}>
          <img src={img} alt={`${brand} ${model}`} className={css.image} />

          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.titleContainer}>
              <h3 className={css.titleForm}>Book your car now</h3>
              <p className={css.textForm}>
                Stay connected! We are always ready to help you.
              </p>
            </div>

            <div className={css.inputContainer}>
              <input name="name" type="text" placeholder="Name*" required />
              <input name="email" type="email" placeholder="Email*" required />
              <input
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                required
              />

              <textarea
                className={css.textarea}
                name="textarea"
                placeholder="Comment"
              />
            </div>
            <button type="submit">Send</button>
          </form>
        </div>

        <div className={css.rContainer}>
          <h2 className={css.title}>
            {brand} <span>{model}</span>, {year}
          </h2>

          <p className={css.location}>
            {address} &nbsp;&nbsp;|&nbsp;&nbsp;Mileage: {mileageFormatted} km
          </p>

          <p className={css.price}>${rentalPrice}</p>

          <p className={css.description}>{description}</p>

          <div className={css.infoContainer}>
            <div>
              <h3 className={css.subTitle}>Rental Conditions:</h3>
              <ul className={css.list}>
                {Array.isArray(rentalConditions)
                  ? rentalConditions.map((item, i) => <li key={i}>{item}</li>)
                  : rentalConditions
                      .split("\n")
                      .map((line, i) => <li key={i}>{line}</li>)}
              </ul>
            </div>

            <div>
              <h3 className={css.subTitle}>Car Specifications:</h3>
              <ul className={css.list}>
                <li>
                  <span>Year:</span> {year}
                </li>
                <li>
                  <span>Type:</span> {type}
                </li>
                <li>
                  <span>Fuel Consumption:</span> {fuelConsumption}
                </li>
                <li>
                  <span>Engine Size:</span> {engineSize}
                </li>
              </ul>
            </div>

            <div>
              <h3 className={css.subTitle}>Accessories and functionalities:</h3>
              <ul className={css.list}>
                {accessories?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {functionalities?.map((item, i) => (
                  <li key={`f-${i}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;

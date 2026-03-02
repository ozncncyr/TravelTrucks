import css from "./VehicleCard.module.css";
import "../../index.css";
import { Link } from "react-router-dom";
import sprite from "../../assets/icons.svg";
import MenuTruckRateLoc from "../MenuTruckRateLoc/MenuTruckRateLoc.jsx";
import { setIsFavorite } from "../../redux/isFavorite/slice.js";
import { useDispatch, useSelector } from "react-redux";
import { selectorIsFavorite } from "../../redux/isFavorite/selectors.js";
import { priceFormat } from "../../utility/priceFormat";
import { useState, useRef } from "react";

export default function VehicleCard({ truck }) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectorIsFavorite);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const heartTimeout = useRef();

  if (!truck) return null;
  const booleanFavorite = favorites.includes(Number(truck.id));

  const objectIcons = {
    AC: "AC",
    TV: "TV",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
  };

  const handleFavoriteClick = () => {
    // Only animate if not already favorite
    if (!booleanFavorite) {
      setShowHeartBurst(true);
      clearTimeout(heartTimeout.current);
      heartTimeout.current = setTimeout(() => setShowHeartBurst(false), 900);
    }
    dispatch(setIsFavorite(truck.id));
  };

  return (
    <div className={css.vehicleCard}>
      <h2 className="visually-hidden">Trucks List</h2>
      <div className={css.truckImage}>
        {truck.gallery && truck.gallery.length > 0 && (
          <img src={truck.gallery[0].thumb} alt={`${truck.name} image`} />
        )}
        {showHeartBurst && (
          <svg
            className={css.heartBurst}
            width="160"
            height="160"
            viewBox="0 0 32 32"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <use xlinkHref={`${sprite}#Heart-active`} />
          </svg>
        )}
      </div>

      <div className={css.truckHeader}>
        <h3 className={css.truckName}>{truck.name}</h3>
        <div className={css.truckPriceContainer}>
          <p className={css.truckPrice}>€ {priceFormat(truck.price)}</p>
          <svg
            className={`${css.svgBorder} ${
              booleanFavorite ? css.svgBorderActive : ""
            }`}
            onClick={handleFavoriteClick}
            width="25"
            height="24"
          >
            <use
              xlinkHref={`${sprite}#${
                booleanFavorite ? "Heart-active" : "Heart"
              }`}
            />
          </svg>
        </div>
      </div>
      <MenuTruckRateLoc truck={truck} to={`/catalog/${truck.id}`} />

      <p className={css.truckDescription}>{truck.description}</p>

      <ul className={css.truckFeatures}>
        {Object.entries(objectIcons).map(
          ([key, name]) =>
            truck[key] && (
              <li className={css.featureItem} key={key}>
                <svg className={css.featureIcon}>
                  <use xlinkHref={`${sprite}#${name}`} />
                </svg>
                <p className={css.featureItemName}>{name}</p>
              </li>
            ),
        )}
      </ul>

      <div className={css.showMoreButtonContainer}>
        <Link className={css.showMoreButton} to={`/catalog/${truck.id}`}>
          Show more
        </Link>
      </div>
    </div>
  );
}

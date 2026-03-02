import "../../index.css";
import css from "./CamperReviews.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTrucks } from "../../redux/trucks/selectors.js";
import sprite from "../../assets/icons.svg";

export default function CamperReviews() {
  const { camperId } = useParams();
  const { reviews } = useSelector(selectTrucks)[camperId - 1];

  return (
    <li className={css.reviewSection}>
      <h2 className="visually-hidden">Reviews</h2>
      {reviews.map((review) => (
        <div key={review.reviewer_name} className={css.reviewContainer}>
          <div className={css.avatar}>{review.reviewer_name.charAt(0)}</div>
          <div className={css.reviewContent}>
            <h3 className={css.reviewName}>
              {review.reviewer_name}{" "}
              {Array.from({ length: review.reviewer_rating }).map((_, i) => (
                <svg
                  key={i}
                  className={css.starIcon}
                  width="16"
                  height="16"
                  style={{
                    marginLeft: 2,
                    marginRight: 2,
                    marginBottom: 2,
                    verticalAlign: "middle",
                  }}
                >
                  <use xlinkHref={`${sprite}#icon-rating`} />
                </svg>
              ))}
            </h3>
            <p className={css.reviewComment}>{review.comment}</p>
          </div>
        </div>
      ))}
    </li>
  );
}

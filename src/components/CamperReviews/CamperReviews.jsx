import React from "react";
import css from "./CamperReviews.module.css";

export default function CamperReviews({ reviews }) {
  return (
    <div className={css.container}>
      <h2>Camper Reviews</h2>
      {/* Yorumlar burada listelenecek */}
      {reviews && <pre>{JSON.stringify(reviews, null, 2)}</pre>}
    </div>
  );
}

import React from "react";
import css from "./CamperForm.module.css";

export default function CamperForm({ onSubmit }) {
  return (
    <form className={css.container} onSubmit={onSubmit}>
      <h2>Camper Form</h2>
      {/* Form alanları buraya gelecek */}
    </form>
  );
}

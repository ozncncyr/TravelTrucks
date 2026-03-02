import React, { useEffect } from "react";
import css from "./SlideModal.module.css";

export default function SlideModal({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
  title,
}) {
  const [current, setCurrent] = React.useState(initialIndex);

  useEffect(() => {
    if (isOpen) setCurrent(initialIndex);
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, current]);

  if (!isOpen || !images || images.length === 0) return null;

  const prevImage = () =>
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const nextImage = () =>
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={css.imageContainer}>
          <img
            src={images[current].thumb || images[current]}
            alt="slide"
            className={css.slideImage}
          />
        </div>
        <div className={css.modalTitle}>{title}</div>
        <div className={css.controls}>
          <button className={css.arrow} onClick={prevImage}>
            &lt;
          </button>
          <span className={css.counter}>
            {current + 1} / {images.length}
          </span>
          <button className={css.arrow} onClick={nextImage}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

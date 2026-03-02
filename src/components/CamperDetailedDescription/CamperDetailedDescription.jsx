import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../index.css";
import css from "./CamperDetailedDescription.module.css";
import { selectTrucks } from "../../redux/trucks/selectors.js";
import MenuTruckRateLoc from "../MenuTruckRateLoc/MenuTruckRateLoc.jsx";
import { priceFormat } from "../../utility/priceFormat";
import SlideModal from "../SlideModal/SlideModal.jsx";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function CamperDetailedDescription() {
  const { camperId } = useParams();
  const truck = useSelector(selectTrucks)[camperId - 1];
  const duplicatedGallery = [];

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalIndex, setModalIndex] = React.useState(0);

  if (truck.gallery.length <= 3) {
    for (let i = 0; i < 3; i++) {
      truck.gallery.map((elem) => duplicatedGallery.push(elem));
    }
  } else {
    duplicatedGallery.push(truck.gallery);
  }

  const handleImageClick = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  return (
    <>
      <h2 className="visually-hidden">Info truck card</h2>
      <h3 className={css.truckName}>{truck.name}</h3>
      <MenuTruckRateLoc truck={truck} to={`/catalog/${truck.id}`} />
      <p className={css.truckPrice}>€ {priceFormat(truck.price)}</p>

      {duplicatedGallery.length > 0 && (
        <>
          <div className={css.imgList}>
            {truck.gallery.map((img, id) => (
              <img
                key={id}
                className={css.imgItem}
                src={img.thumb}
                alt={`${truck.name} image`}
                style={{ cursor: "pointer", marginRight: 12 }}
                onClick={() => handleImageClick(id)}
              />
            ))}
          </div>
          <SlideModal
            images={truck.gallery}
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            initialIndex={modalIndex}
            title={truck.name}
          />
        </>
      )}
      <p className={css.truckDescription}>{truck.description}</p>
    </>
  );
}

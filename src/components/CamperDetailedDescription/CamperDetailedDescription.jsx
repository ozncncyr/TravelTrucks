import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../index.css";
import css from "./CamperDetailedDescription.module.css";
import { selectTrucks } from "../../redux/trucks/selectors.js";
import MenuTruckRateLoc from "../MenuTruckRateLoc/MenuTruckRateLoc.jsx";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function CamperDetailedDescription() {
  const { camperId } = useParams();
  const truck = useSelector(selectTrucks)[camperId - 1];
  const duplicatedGallery = [];

  if (truck.gallery.length <= 3) {
    for (let i = 0; i < 3; i++) {
      truck.gallery.map((elem) => duplicatedGallery.push(elem));
    }
  } else {
    duplicatedGallery.push(truck.gallery);
  }

  return (
    <>
      <h2 className="visually-hidden">Info truck card</h2>
      <h3 className={css.truckName}>{truck.name}</h3>
      <MenuTruckRateLoc truck={truck} to={`/catalog/${truck.id}`} />
      <p className={css.truckPrice}>€{truck.price}</p>

      {duplicatedGallery.length > 0 && (
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={800}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 36,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className={css.imgList}
        >
          {truck.gallery.map((img, id) => (
            <SwiperSlide key={id} className={css.imgSlide}>
              <img
                className={css.imgItem}
                src={img.thumb}
                alt={`${truck.name} image`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <p className={css.truckDescription}>{truck.description}</p>
    </>
  );
}

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

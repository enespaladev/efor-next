import React from "react";
import { useSwiper } from 'swiper/react';

import { FaAngleLeft} from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

import style from "./style.module.css";

export const ProductNavButton = () => {
    const swiper = useSwiper();

    return (
        <div>
            <div className={style["swiper-button-prev"]} onClick={() => swiper.slidePrev()}>
            <FaAngleLeft />
            </div>
            <div className={style["swiper-button-next"]} onClick={() => swiper.slideNext()}>
            <FaAngleRight />
            </div>
        </div>
    );
};
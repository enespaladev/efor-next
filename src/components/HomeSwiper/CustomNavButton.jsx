import React from "react";
import { useSwiper } from 'swiper/react';

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

// import style from "./style.module.css";
// import "./style.module.css";
import "./style.css";

const CustomNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div>
            <div 
                // className={style["swiper-button-prev"]} 
                className={"swiper-button-prev"} 
                id="home_banner_button_prev" 
                onClick={() => swiper.slidePrev()}
                >
            <FaArrowLeft />
            </div>
            <div 
                // className={style["swiper-button-next"]} 
                className={"swiper-button-next"} 
                id="home_banner_button_next"   
                onClick={() => swiper.slideNext()}
            >
            <FaArrowRight />
            </div>
        </div>
    );
};

export default CustomNavButtons;
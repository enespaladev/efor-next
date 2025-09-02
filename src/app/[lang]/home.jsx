"use client";
import React from 'react'

// import Header from '../../components/header';
// import Footer from '../components/Footer'
import HomeSwiper from '../../components/HomeSwiper'
import ProductSlider from '../../components/ProductSlider'
import AfterSelling from '../../components/AfterSelling'
import Certificates from '../../components/Certificates'
import Lines from '../../components/Lines'
import MobileMenu from '@/components/MobilMenu/mobile-menu'

import dynamic from "next/dynamic";

// const ClientSwiper = dynamic(() => import('@/components/HomeSwiper'), {
//   ssr: false,
//   loading: () => <div style={{ minHeight: "500px" }} />,
// });

function Home() {
  return (
    <>
      {/* <ClientSwiper /> */}
      <HomeSwiper />
      <ProductSlider />
      <AfterSelling />
      <Certificates />
      <Lines />
    </>
  )
}

export default Home
'use client';
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CustomNavButtons from './CustomNavButton';
// import style from './style.module.css';
// import './style.module.css';
import './style.css';
import Image from 'next/image';

function HomeSwiper() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [slides, setSlides] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());

  // API'den slider verilerini çekme fonksiyonu
  const fetchSliderData = async () => {
    try {
      // Şimdilik sabit veriler
      const mockData = [
        {
          id: 1,
          image: "/img/1mtpq-1710768670-424.webp",
          title: "Title 1",
          description: "Description 1"
        },
        {
          id: 2,
          image: "/img/ehzbb-1710768679-582.webp",
          title: "Title 2", 
          description: "Description 2"
        }
      ];
      
      setSlides(mockData);
      setTotalImages(mockData.length);
      
    } catch (error) {
      console.error('Slider data fetch error:', error);
      // Fallback veriler
      const fallbackData = [
        {
          id: 1,
          image: "https://aknmachine.com/backend/assets/img/banners/1mtpq-1710768670-424.webp",
          title: "Default Title 1",
          description: "Default Description 1"
        },
        {
          id: 2,
          image: "https://aknmachine.com/backend/assets/img/banners/ehzbb-1710768679-582.webp",
          title: "Default Title 2",
          description: "Default Description 2"
        }
      ];
      setSlides(fallbackData);
      setTotalImages(fallbackData.length);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  // Resim yüklenme kontrolü - daha esnek yaklaşım
  useEffect(() => {
    if (totalImages > 0) {
      const allImagesProcessed = loadedImages + imageLoadErrors.size >= totalImages;
      
      if (allImagesProcessed) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 300);
        return () => clearTimeout(timer);
      }

      // Maksimum bekleme süresi (fallback)
      const maxWaitTimer = setTimeout(() => {
        console.warn('Resim yükleme zaman aşımına uğradı, slider gösteriliyor');
        setIsLoading(false);
      }, 5000); // 5 saniye

      return () => clearTimeout(maxWaitTimer);
    }
  }, [loadedImages, totalImages, imageLoadErrors]);

  const handleImageLoad = () => {
    console.log('Resim yüklendi');
    setLoadedImages(prev => prev + 1);
  };

  const handleImageError = (imageId) => {
    console.error(`Resim yüklenemedi: ${imageId}`);
    setImageLoadErrors(prev => new Set([...prev, imageId]));
  };

  // Image Skeleton Component
  const ImageSkeleton = ({ slideNumber }) => (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite'
    }}>
      {/* Image Icon */}
      <svg width="64" height="64" fill="#ccc" viewBox="0 0 24 24">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
      </svg>
    </div>
  );

  // Loading state - slides yüklenmemiş veya resimler henüz yükleniyor
  if (slides.length === 0 || isLoading) {
    return (
      <div
        // className={style['home-banner-slider']}
        className={'home-banner-slider'}
        style={{
          position: 'relative',
          width: '100%',
          height: '600px',
        }}
      >
        {/* Shimmer CSS Animation */}
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
        
        <div 
          // className={style['skeleton-container']} 
          className={'skeleton-container'} 
          style={{height: '100%'}}
          >
          {[...Array(totalImages || 2)].map((_, i) => (
            <div
              key={i}
              // className={style['skeleton-slide']}
              className={'skeleton-slide'}
              style={{
                width: '100%',
                height: '100%',
                position: totalImages <= 1 ? 'static' : i === 0 ? 'static' : 'absolute',
                top: totalImages <= 1 ? 'auto' : i === 0 ? 'auto' : 0,
                left: totalImages <= 1 ? 'auto' : i === 0 ? 'auto' : 0,
                opacity: totalImages <= 1 ? 1 : i === 0 ? 1 : 0.3,
                zIndex: totalImages <= 1 ? 'auto' : i === 0 ? 10 : i
              }}
            >
              <ImageSkeleton slideNumber={i + 1} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  console.log("IsLoading:", isLoading, "LoadedImages:", loadedImages, "TotalImages:", totalImages);

  return (
    <div 
      // className={style['home-banner-slider']}
      className={'home-banner-slider'}
    >
      <div
        style={{
          position: 'relative',
          height: '600px',
          width: '100%',
        }}
      >
        <Swiper
          navigation={false}
          loop={true}
          modules={[Navigation]}
          onInit={(swiper) => {
            // Swiper ilk hazır olduğunda çalışacak
            setTimeout(() => {
              const slides = swiper.el.querySelectorAll('.swiper-slide');
              slides.forEach((slide) => {
                slide.style.display = 'block';
              });
              swiper.update();
            }, 10);
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id || index}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={slide.image}
                  alt={slide.title || `banner-${index + 1}`}
                  width={1920}
                  height={600}
                  priority={index === 0}
                  onLoad={handleImageLoad}
                  onError={() => handleImageError(slide.id || index)}
                  style={{
                    objectFit: 'cover',
                    width: '100%',
                    height: '600px'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
          <CustomNavButtons />
        </Swiper>
      </div>
    </div>
  )
}

export default HomeSwiper;
'use client';
import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CustomNavButtons from './CustomNavButton';
import './style.css';
import Image from 'next/image';

// Skeleton Loading Component
const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-slide">
        <div className="skeleton-image"></div>
        <div className="skeleton-overlay">
          <div className="skeleton-text skeleton-title"></div>
          <div className="skeleton-text skeleton-description"></div>
        </div>
      </div>

      <style jsx>{`
        .skeleton-container {
          position: relative;
          width: 100%;
          height: 600px;
          background: #f0f0f0;
          overflow: hidden;
        }
        
        .skeleton-slide {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .skeleton-image {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .skeleton-overlay {
          position: absolute;
          bottom: 80px;
          left: 80px;
          z-index: 2;
        }
        
        .skeleton-text {
          background: linear-gradient(90deg, #d0d0d0 25%, #c0c0c0 50%, #d0d0d0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        
        .skeleton-title {
          width: 300px;
          height: 32px;
        }
        
        .skeleton-description {
          width: 250px;
          height: 20px;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @media (max-width: 768px) {
          .skeleton-overlay {
            bottom: 40px;
            left: 20px;
          }
          
          .skeleton-title {
            width: 200px;
            height: 24px;
          }
          
          .skeleton-description {
            width: 180px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
};

function HomeSwiper() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [slides, setSlides] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchSliderData = async () => {
    try {
      // Loading simülasyonu (gerçek API çağrısını simüle etmek için)
      await new Promise(resolve => setTimeout(resolve, 800));

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
      setDataLoaded(true);

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
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  // Console log'lar ekleyin fetchSliderData fonksiyonuna:
  // console.log('Data loaded:', mockData);
  console.log('dataLoaded state:', dataLoaded);
  console.log('isLoading state:', isLoading);

  // useEffect'te de:
  useEffect(() => {
    console.log('useEffect triggered:', { dataLoaded, totalImages, isLoading });
    if (dataLoaded && totalImages > 0) {
      console.log('Setting isLoading to false');
      setIsLoading(false);
    }
  }, [dataLoaded, totalImages]);

  const handleImageLoad = () => {
    console.log('Resim yüklendi');
    setLoadedImages(prev => prev + 1);
  };

  const handleImageError = (imageId) => {
    console.error(`Resim yüklenemedi: ${imageId}`);
    setImageLoadErrors(prev => new Set([...prev, imageId]));
    // Hatalı resim de sayılsın ki loading tamamlansın
    setLoadedImages(prev => prev + 1);
  };

  // Loading durumunda skeleton göster
  if (isLoading || !dataLoaded) {
    return (
      <div className={'home-banner-slider'}>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div className={'home-banner-slider'}>
      <div style={{
        position: 'relative',
        height: '600px',
        width: '100%',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <Swiper
          navigation={false}
          loop={true}
          modules={[Navigation]}
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
                  unoptimized
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
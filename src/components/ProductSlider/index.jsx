'use client';
import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductNavButton } from './ProductNavButton';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { fetchCategories } from '@/redux/categorySlice';
import Image from 'next/image';
import "swiper/css";
import 'swiper/css/navigation';

export function SkeletonCard() {
  return (
    <div className="animate-pulse flex flex-col items-center space-y-3">
      <div className="bg-gray-300 rounded-lg w-[400px] h-[300px]" />
      <div className="bg-gray-300 rounded w-32 h-6" />
    </div>
  )
}

function SkeletonSwiper() {
  return (
    <div className={`${styles.ProductSwiper} ProductSwiper container max-w-fit h-full`}>
      <div className={`${styles.swiper} h-full w-full flex justify-center items-center gap-6`}>
        <div className="flex justify-center items-center space-x-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`${styles.list} h-full ${i === 1 ? 'transform scale-110' : 'opacity-60'}`}>
              <div className={styles.item}>
                <span className={`${styles.img} block bg-gray-300 animate-pulse`}>
                  <div className="w-full h-full bg-gray-200 rounded-lg aspect-[4/3]" />
                </span>
                <div className={`${styles.title} bg-gray-300 animate-pulse mt-4 h-6 rounded`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductSlider() {
  const language = useSelector((state) => state.language.language);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const { categories, isFetched } = useSelector((state) => state.category);
  const titlekey = `title_${language}`;

  // Client-side mounting kontrolü
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isFetched]);

  // İlk 3 görüntüyü preload et
  useEffect(() => {
    if (categories.length > 0 && isClient) {
      categories.slice(0, 3).forEach((item, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = `https://nutsroastermachine.com/${item.photo}`;
        if (index === 0) {
          link.fetchPriority = 'high';
        }
        document.head.appendChild(link);
      });
    }
  }, [categories, isClient]);

  return (
    <div className={`${styles.ProductSliderSection} justify-center flex flex-col flex-initial items-center`}>
      <div className='text-center w-1/2 max-sm:w-full max-sm:px-5 max-sm:pt-11'>
        <h1 className={styles.homeProductSliderTitle}>
          <FormattedMessage id='ProductSliderMessages.title' />
        </h1>
        <p className={styles.homeProductSliderText}>
          <FormattedMessage id='ProductSliderMessages.desc' />
        </p>
      </div>

      <div className="w-full min-h-[400px] flex items-center">
        {!isFetched ? (
          <SkeletonSwiper />
        ) : (
          <div className={`${styles.ProductSwiper} ProductSwiper container max-w-fit h-full mx-auto`}>
            <Swiper
              className={`${styles.swiper} h-full w-full`}
              effect={'coverflow'}
              centeredSlides={true}
              navigation={false}
              loop={true}
              grabCursor={false}
              slidesPerView={1}
              spaceBetween={50}
              lazy={true} // Lazy loading aktif
              preloadImages={false} // Preload images kapalı
              watchSlidesProgress={true}
              breakpoints={{
                768: {
                  slidesPerView: 2.8
                }
              }}
              coverflowEffect={{
                rotate: 0,
                stretch: 100,
                depth: 80,
                modifier: 1.5,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Navigation]}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              onSwiper={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {categories.map((item, index) => (
                <SwiperSlide
                  key={item._id}
                  className={index === activeIndex ? styles.activeSlide : ''}
                >
                  <div className={`${styles.list} h-full`}>
                    <a href="" className={styles.item}>
                      <span className={styles.img}>
                        <Image
                          src={`https://nutsroastermachine.com/${item.photo}`}
                          alt={item[titlekey]}
                          width={400}
                          height={300}
                          loading={index < 3 ? "eager" : "lazy"}
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : "auto"}
                          quality={index < 3 ? 85 : 75} // İlk 3 resim daha yüksek kalite
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIAAxEhkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvTHzIIlqOQ26H0AdHo9AT4JYtH8AkBYWVfUCtVP5P8AZ"
                          sizes={index < 3 ? "400px" : "300px"}
                          style={{ 
                            objectFit: "cover",
                            width: '100%',
                            height: 'auto'
                          }}
                          className="aspect-[4/3]"
                          onLoadingComplete={() => {
                            // İlk görüntü yüklendiğinde LCP'yi optimize et
                            if (index === 0) {
                              requestIdleCallback(() => {
                                // Performans optimizasyonu için callback
                              });
                            }
                          }}
                        />
                      </span>
                      <h2 className={styles.title}>{item[titlekey]}</h2>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
              <ProductNavButton />
            </Swiper>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSlider
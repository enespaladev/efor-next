// hooks/useLayoutStabilizer.js
import { useState, useEffect } from 'react';

export const useLayoutStabilizer = (minLoadingTime = 1000) => {
  const [isStabilized, setIsStabilized] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStabilized(true);
    }, minLoadingTime);
    
    return () => clearTimeout(timer);
  }, [minLoadingTime]);
  
  return isStabilized;
};

// components/LayoutStabilizer.jsx
'use client';
import { useLayoutStabilizer } from '../hooks/useLayoutStabilizer';

const LayoutStabilizer = ({ 
  children, 
  skeleton, 
  minHeight = '600px',
  minLoadingTime = 800 
}) => {
  const isStabilized = useLayoutStabilizer(minLoadingTime);
  
  return (
    <div style={{ 
      minHeight,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {isStabilized ? children : skeleton}
    </div>
  );
};

// Kullanım örneği - Ana sayfanızda:
// components/HomePage.jsx
'use client';
import React from 'react';
import HomeSwiper from './HomeSwiper';
import Footer from './Footer';
import LayoutStabilizer from './LayoutStabilizer';

const SwiperSkeleton = () => (
  <div style={{
    height: '600px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(90deg, #eee, #ddd, #eee)',
    backgroundSize: '200% 100%',
    animation: 'loading 1.5s infinite'
  }}>
    <div style={{
      padding: '20px',
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '200px',
        height: '40px',
        backgroundColor: '#ddd',
        marginBottom: '15px',
        borderRadius: '4px'
      }}></div>
      <div style={{
        width: '300px',
        height: '20px',
        backgroundColor: '#ddd',
        borderRadius: '4px'
      }}></div>
    </div>
  </div>
);

const HomePage = () => {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <LayoutStabilizer
        skeleton={<SwiperSkeleton />}
        minHeight="600px"
        minLoadingTime={800}
      >
        <HomeSwiper />
      </LayoutStabilizer>
      
      {/* Diğer içerikleriniz */}
      <section style={{ flex: 1 }}>
        {/* Sayfa içeriği */}
      </section>
      
      <Footer />
    </main>
  );
};

export default HomePage;
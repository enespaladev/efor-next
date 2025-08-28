'use client';

import React, { useEffect, useRef } from 'react';
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';
import Inputmask from 'inputmask';

export default function PhoneInput({ value, onChange }) {
  const inputRef = useRef(null);
  const itiRef = useRef(null);
  const maskRef = useRef(null);

  const applyMask = () => {
    if (!itiRef.current || !inputRef.current) return;

    const countryData = itiRef.current.getSelectedCountryData();
    if (!countryData || !countryData.iso2) return;

    try {
      const exampleNumber = window.intlTelInputUtils?.getExampleNumber(
        countryData.iso2,
        false,
        window.intlTelInputUtils.numberFormat.MOBILE
      );

      if (!exampleNumber) {
        console.warn('Örnek numara alınamadı:', countryData.iso2);
        return;
      }

      // Örnek numaradan mask oluştur
      const numericMask = exampleNumber.replace(/[0-9]/g, '9');
      
      // Eski maskeyi temizle
      if (maskRef.current) {
        maskRef.current.remove();
      }

      // Yeni maske oluştur
      const mask = new Inputmask({
        mask: numericMask,
        placeholder: '_',
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearMaskOnLostFocus: false,
        autoUnmask: true
      });

      maskRef.current = mask;
      mask.mask(inputRef.current);

      // Değeri güncelle
      if (value) {
        inputRef.current.value = value;
      }
    } catch (error) {
      console.error('Maske uygulanırken hata:', error);
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;

    itiRef.current = intlTelInput(inputRef.current, {
      initialCountry: 'tr',
      separateDialCode: true,
      nationalMode: false,
      geoIpLookup: (success) => {
        fetch('https://ipapi.co/json')
          .then((res) => res.json())
          .then((data) => success(data.country_code))
          .catch(() => success('tr'));
      },
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js',
    });

    // Utils script yüklendikten sonra maskeyi uygula
    inputRef.current.addEventListener('countrychange', applyMask);

    // İlk yüklemede maskeyi uygulamak için
    const checkUtils = setInterval(() => {
      if (window.intlTelInputUtils) {
        clearInterval(checkUtils);
        applyMask();
      }
    }, 200);

    return () => {
      if (itiRef.current) itiRef.current.destroy();
      if (maskRef.current) maskRef.current.remove();
      if (inputRef.current) {
        inputRef.current.removeEventListener('countrychange', applyMask);
      }
    };
  }, []);

  useEffect(() => {
    if (inputRef.current && value !== undefined) {
      inputRef.current.value = value;
    }
  }, [value]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange && onChange(value);
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="tel"
        onChange={handleInputChange}
        className="h-12 border rounded-lg border-gray-200 w-full px-4"
      />
    </div>
  );
}
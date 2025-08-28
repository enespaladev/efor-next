'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '@/redux/languageSlice';

export default function LanguageInitializer({ lang, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // URL'den gelen language'i Redux store'a set et
    dispatch(setLanguage(lang));
  }, [lang, dispatch]);

  return children;
}
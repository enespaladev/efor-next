// product-list.jsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByCategory,
  setSelectedProductId,
} from '@/redux/productSlice';
import {
  fetchCategories,
  setSelectedCategoryId,
} from '@/redux/categorySlice'; // <-- EKLE
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProductDetailUrl } from '@/lib/routeHelpers';
import './style.css';
import Container from '../Container/container';

export default function ProductList() {
  const params = useParams();
  const categorySlug = params?.category;

  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((s) => s.product);
  const language = useSelector((s) => s.language.language);

  const { categories, isFetched: categoriesFetched, selectedCategoryId } =
    useSelector((s) => s.category);

  // Kategoriler yoksa getir
  useEffect(() => {
    if (!categoriesFetched) {
      dispatch(fetchCategories());
    }
  }, [categoriesFetched, dispatch]);

  // URL'den direkt gelince slug -> id çöz
  useEffect(() => {
    if (!selectedCategoryId && categories?.length && categorySlug) {
      // Bazı projelerde TR için "slug", diğer diller için "slug_en" vs. olur
      const slugFields = ['slug', `slug_${language}`];
      const found = categories.find((c) =>
        slugFields.some((f) => c?.[f] === categorySlug)
      );

      if (found?.id) {
        dispatch(setSelectedCategoryId(found.id));
        dispatch(fetchProductsByCategory(found.id));
      }
    }
  }, [selectedCategoryId, categories, categorySlug, language, dispatch]);

  // Zaten state'te id varsa (örn: tıklayarak gelindiyse) ürünleri çek
  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(fetchProductsByCategory(selectedCategoryId));
    }
  }, [dispatch, selectedCategoryId]);

  const skeletonArray = new Array(6).fill(0);

  return (
    <Container>

      <div className='mx-auto px-4 sm:px-6 md:px-26 lg:px-26 xl:px-26'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 pt-30 pb-20'>
          {isLoading
            ? skeletonArray.map((_, index) => (
              <div className='categoryItem animate-pulse' key={index}>
                <div className='categoryImg bg-gray-200 h-[200px] w-full rounded'></div>
                <div className='categoryContent mt-4 space-y-2'>
                  <div className='h-4 bg-gray-300 w-3/4 rounded'></div>
                  <div className='h-3 bg-gray-200 w-full rounded'></div>
                </div>
              </div>
            ))
            : products?.map((item, index) => {
              const firstImage = item.photo?.split(',')[0] || '';
              const productSlug =
                language === 'tr' ? item.slug : item[`slug_${language}`];

              return (
                <div className='categoryItem' key={index}>
                  <div style={{ marginBottom: "0", }} className='categoryImg'>
                    <Link
                      href={getProductDetailUrl(language, categorySlug, productSlug)}
                      onClick={() => {
                        sessionStorage.setItem('selectedProductId', item.id);
                        dispatch(setSelectedProductId(item.id));
                      }}
                    >
                      <img
                        src={`https://nutsroastermachine.com/${firstImage}`}
                        alt={item[language === 'tr' ? 'title' : `title_${language}`]}
                        className='w-full h-[200px] object-cover rounded'
                      />
                    </Link>
                  </div>
                  <div className='categoryContent mt-4'>
                    <span className='categoryTitle block font-semibold text-lg' style={{ fontFamily: 'Oswald', lineHeight: "20px" }}>
                      {item[language === 'tr' ? 'summary' : `summary_${language}`]}
                    </span>
                    <p className='text-sm text-gray-700'>
                      {item[language === 'tr' ? 'title' : `title_${language}`]}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>

        {!isLoading && !products?.length && (
          <div className="text-center text-gray-500 py-10">
            Bu kategoride ürün bulunamadı.
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-8">
            Hata: {error}
          </div>
        )}
      </div>
    </Container>
  );
}

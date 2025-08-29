"use client";
import React, { useEffect, useState } from 'react'

import './style.css';
import LocomotiveScroll from 'locomotive-scroll';
// import about_bg from '/img/about_bg.webp';
import { FaPlay } from "react-icons/fa6";
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/categorySlice';
import Link from 'next/link'
import { routesMap } from '@/lib/routes';

import { getProductCategoryUrl } from '@/lib/routeHelpers';
import { setSelectedCategoryId } from '@/redux/categorySlice';
import Container from '../Container/container';

import localFont from 'next/font/local';

const oswald = localFont({
  src: [
    {
      path: '../../../public/fonts/Oswald/Oswald-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Oswald/Oswald-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})

function ProductCategories() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolled2, setIsScrolled2] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const language = useSelector((state) => state.language.language);

  const dispatch = useDispatch();
  const { categories, isFetched } = useSelector((state) => state.category);
  // const {cat_id, setCatId} = useState(0);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isFetched]);

  console.log("Categories:", categories);

  return (
    <Container>
      <div className='mx-auto px-4 sm:px-6 md:px-26 lg:px-26 xl:px-26'>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 pt-30 pb-20'>
          {
            categories.map((item, index) => (
              <div className='categoryItem' key={index}>
                <div className='categoryImg'>
                  <Link
                    key={index}
                    href={getProductCategoryUrl(language, item[`slug_${language}`])}
                    onClick={() => {
                      sessionStorage.setItem('selectedCategoryId', item.id);
                      dispatch(setSelectedCategoryId(item.id));
                    }}
                  >
                    <img src={`https://api.nutsroastermachine.com/${item.photo}`} alt="" />
                  </Link>
                </div>
                <div className='categoryContent'>
                  <span className='categoryTitle'>
                    <a href="">
                      {`${item[`title_${language}`]}`}
                    </a>
                  </span>
                  <p>{`${item[`summary_${language}`]}`}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Container>
  )
}

export default ProductCategories
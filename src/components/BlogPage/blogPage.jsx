"use client";
import React, { useEffect, useState } from 'react'

import './style.css';

import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import localFont from 'next/font/local';
import { fetchBlogs } from '@/redux/blogSlice';
import { blog_data } from './data';
import { getBlogDetailUrl } from '@/lib/routeHelpers';
import Link from 'next/link';

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

function BlogPage() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const { blogs, isLoading, isFetched, error } = useSelector((state) => state.blog);

  const skeletonArray = new Array(6).fill(0);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchBlogs());
    }
  }, [dispatch, isFetched]);

  console.log("Blogs", blogs);

  return (
    <div className={oswald.className} style={{ backgroundColor: "#fafafa" }}>
      <div className='blogSection'>
        <div className='flex justify-center text-center'>
          <h2 className='mt-6 mb-10 blogTitle font-bold tracking-tight text-zinc-800 dark:text-zinc-100'>Efor Blog</h2>
        </div>
        <div className='container sm:px-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 pb-20'>
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
              : blogs.map((item, index) => {
                return (
                  <div className='post-item' key={index}>
                    <div className='post__img'>
                      <img src={item.photo} alt="" />
                    </div>
                    <div className='post__content'>
                      <h4 className='post__title'>{item[`title_${language}`]}</h4>
                      <p className='post__desc'>
                        {item[`summary_${language}`]}
                      </p>
                      <Link
                        href={getBlogDetailUrl(language, item[`slug_${language}`])}
                        onClick={() => {
                          sessionStorage.setItem('selectedBlogId', item.id);
                          dispatch(setSelectedBlogId(item.id));
                        }}
                      >
                        <p className='post__button'><FormattedMessage id='read_more' /></p>
                      </Link>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage
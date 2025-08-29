'use client';
import React, { useEffect } from 'react'
import style from './style.module.css';
import { LinesData } from './data';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Container from '../Container/container';
import { fetchBlogs, fetchLatestBlogs, setSelectedBlogId } from '@/redux/blogSlice';
import Link from 'next/link';
import { getBlogDetailUrl } from '@/lib/routeHelpers';

function Lines() {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.language.language);
    const { blogs, latestBlogs, isLoading, isFetched, error } = useSelector((state) => state.blog);

    const skeletonArray = new Array(6).fill(0);

    useEffect(() => {
        if (!isFetched) {
            dispatch(fetchLatestBlogs());
        }
    }, [dispatch, isFetched]);

    console.log("Latest Blogs:", latestBlogs);

    return (
        <Container>
            <div className='mb-10'>
                <div className='flex flex-col text-center items-center justify-center'>
                    <span className='color-1 text-5xl font-bold font-oswald'><FormattedMessage id='top_text' /></span>
                    <span className={style.tit2}><FormattedMessage id='alt_text' /></span>
                </div>

                <div className='mt-5'>
                    <Container>
                        <div className='flex mx-auto sm:px-12 md:px-32 lg:px-32 xl:px-32 gap-9'>
                            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 pt-8 pb-20'>
                                {isLoading
                                    ? skeletonArray.map((_, index) => (
                                        <div className="categoryItem animate-pulse" key={index}>
                                            <div className="categoryImg bg-gray-200 h-[200px] w-full rounded"></div>
                                            <div className="categoryContent mt-4 space-y-2">
                                                <div className="h-4 bg-gray-300 w-3/4 rounded"></div>
                                                <div className="h-3 bg-gray-200 w-full rounded"></div>
                                            </div>
                                        </div>
                                    ))
                                    : (latestBlogs && latestBlogs.length > 0
                                        ? latestBlogs.map((item, index) => (
                                            <div key={index} className={style.blogItem}>
                                                <div className={style.blogItemContainer}>
                                                    <div className={style.blogItemImage}>
                                                        <Link
                                                            href={getBlogDetailUrl(language, item[`slug_${language}`])}
                                                            onClick={() => {
                                                                sessionStorage.setItem('selectedBlogId', item.id);
                                                                dispatch(setSelectedBlogId(item.id));
                                                            }}
                                                        >
                                                            <img src={item.photo} alt={item[`title_${language}`] || ''} />
                                                        </Link>
                                                    </div>
                                                    <div className={style.blogItemContent}>
                                                        <span className={style.blogTitle}>
                                                            {item[`title_${language}`]}
                                                        </span>
                                                        <p className={`${style.blogText} mb-5`}>
                                                            {item[`summary_${language}`]}
                                                        </p>
                                                        <div className={style.blogItemBottom}>
                                                            <Link
                                                                href={getBlogDetailUrl(language, item[`slug_${language}`])}
                                                                onClick={() => {
                                                                    sessionStorage.setItem('selectedBlogId', item.id);
                                                                    dispatch(setSelectedBlogId(item.id));
                                                                }}
                                                            >
                                                                <FormattedMessage id='button_text' /> - {item[`title_${language}`]}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        : <p>Blog bulunamadı.</p>
                                    )
                                }
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </Container>
    )
}

export default Lines
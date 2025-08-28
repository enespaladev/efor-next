'use client';
import React from 'react'

import { AfterSellingData } from './data';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import style from './style.module.css';
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

function AfterSelling() {
    const language = useSelector((state) => state.language.language);

    return (
        <div className='mb-20'>
            <Container>
                <div className='max-sm:px-3 mx-auto px-32'>
                    <div className='mb-4 text-center'>
                        <h4 className="title title--xl fade-up active flex flex-col"
                            data-scroll=""
                            data-scroll-offset="0.25"
                            data-scroll-class="fade-up-active"
                            data-scroll-repeat="">
                            <span style={{ color: '#545d64' }} className={`${oswald.className} text-2xl font-semibold gray`}><FormattedMessage id='text_top' /></span>
                            <span className={`${oswald.className} text-5xl font-semibold`}><FormattedMessage id='text_alt' /></span>
                        </h4>
                        {/* <span className={`gray text-secondary mb-0 font-semibold text-xl`}>
                        <FormattedMessage id='text_top' />
                    </span>
                    <span className={`${style['fs-xl-10']} text-5xl color-1 font-bold font-cursive capitalize`}>
                        <FormattedMessage id='text_alt' />
                    </span> */}
                    </div>
                    <div className='shopping-banners'>
                        <div className='grid grid-cols-4 max-sm:grid-cols-2 gap-8'>
                            <div className={`${style['shopping-banner']} flex flex-col justify-center items-center flex-wrap h-full w-full text-center rounded-3xl p-12 ease-in-out duration-200`}>
                                <div className={style['shopping-banner-img']}>
                                    <img src="https://nutsroastermachine.com/frontend/images/teknik/icon1.webp" alt="" />
                                </div>
                                <div className='shopping-banner-content'>
                                    <span className='text-xl font-semibold font-oswald color-1'><FormattedMessage id='production' /></span>
                                    <p className='shopping-banner-subtitle mt-2'>
                                        <FormattedMessage id='production_desc' />
                                    </p>
                                </div>
                            </div>

                            <div className={`${style['shopping-banner']} flex flex-col justify-center items-center flex-wrap h-full w-full text-center rounded-3xl p-12 ease-in-out duration-200`}>
                                <div className={style['shopping-banner-img']}>
                                    <img src="https://nutsroastermachine.com/frontend/images/teknik/icon2.webp" alt="" />
                                </div>
                                <div className='shopping-banner-content'>
                                    <span className='text-xl font-semibold font-oswald color-1'><FormattedMessage id='delivery' /></span>
                                    <p className='shopping-banner-subtitle mt-2'>
                                        <FormattedMessage id='delivery_desc' />
                                    </p>
                                </div>
                            </div>

                            <div className={`${style['shopping-banner']} flex flex-col justify-center items-center flex-wrap h-full w-full text-center rounded-3xl p-12 ease-in-out duration-200`}>
                                <div className={style['shopping-banner-img']}>
                                    <img src="https://nutsroastermachine.com/frontend/images/teknik/icon3.webp" alt="" />
                                </div>
                                <div className='shopping-banner-content'>
                                    <span className='text-xl font-semibold font-oswald color-1'><FormattedMessage id='support' /></span>
                                    <p className='shopping-banner-subtitle mt-2'>
                                        <FormattedMessage id='support_desc' />
                                    </p>
                                </div>
                            </div>

                            <div className={`${style['shopping-banner']} flex flex-col justify-center items-center flex-wrap h-full w-full text-center rounded-3xl p-12 ease-in-out duration-200`}>
                                <div className={style['shopping-banner-img']}>
                                    <img src="https://nutsroastermachine.com/frontend/images/teknik/icon4.webp" alt="" />
                                </div>
                                <div className='shopping-banner-content'>
                                    <span className={`color-1 text-xl font-semibold font-oswald`}><FormattedMessage id='need' /></span>
                                    <p className='shopping-banner-subtitle mt-2'>
                                        <FormattedMessage id='need_desc' />
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AfterSelling
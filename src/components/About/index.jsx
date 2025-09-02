"use client";
import React, { useEffect, useState } from 'react'

import './style.css';
import LocomotiveScroll from 'locomotive-scroll';
// import about_bg from '/img/about_bg.webp';
import { FaPlay } from "react-icons/fa6";

import { about_data } from './data';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
const video_1 = "https://api.nutsroastermachine.com/public/frontend/videos/fabrika.mp4";

import VideoModal from '@/components/ui/video-modal';
import Container from '../Container/container';

function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolled2, setIsScrolled2] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const language = useSelector((state) => state.language.language);

  const scrollRef = React.createRef();

  function handleOpenChange() {
    setOpen(!isOpen);
  }

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true
    });
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll2 = () => {
      if (window.scrollY > 450) {
        setIsScrolled2(true);
      } else {
        setIsScrolled2(false);
      }
    };

    window.addEventListener('scroll', handleScroll2);

    return () => {
      window.removeEventListener('scroll', handleScroll2);
    };
  }, []);

  return (
    <div className='subpage about flex flex-col justify-center items-center'>
      <Container>
        <div className='mx-auto px-10'>
          <div className='subpage-intro subpage-intro--center'>
            <h1 className='subpage-intro__title title title--3xl fade-in active' data-scroll='' data-scroll-offset="0.2" data-scroll-delay="1" data-scroll-class="fade-in-active" data-scroll-repeat="">
              <FormattedMessage id='AboutMessages.title' />
            </h1>
            <p className='subpage-intro__text text fade-in active'>
              <FormattedMessage id='short_desc' />
            </p>
          </div>
        </div>
      </Container>
      <Container>

        <div className='mx-auto px-10'>
          <div className='features'>
            <div className='fade-up active'>
              <div className='feature'>
                <img className='feature__img' src="/img/about-1.webp" alt="" />
                <div className='feature-content-wrapper no-will-change'>
                  <div className={isScrolled2 ? 'feature-content fade-up active' : 'feature-content fade-up'}>
                    <div className='count-item count-item--white count-item--sm'>
                      <span className='count-item__number'>70+</span>
                      <span className='count-item__text'><FormattedMessage id='prod_range' /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='fade-up active'>
              <div className='feature'>
                <img className='feature__img' src="/img/about-2.webp" alt="" />
                <div className='feature-content-wrapper no-will-change'>
                  <div className={isScrolled2 ? 'feature-content fade-up active' : 'feature-content fade-up'}>
                    <div className='count-item count-item--white count-item--sm'>
                      <span className='count-item__number'>100%</span>
                      <span className='count-item__text'><FormattedMessage id='customer_satis' /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={isScrolled ? 'fade-up active' : 'fade-up'}> */}
            <div className='fade-up active'>
              <div className='feature'>
                <img className='feature__img' src="/img/about-3.webp" alt="" />
                <div className='feature-content-wrapper no-will-change'>
                  <div className={isScrolled2 ? 'feature-content fade-up active' : 'feature-content fade-up'}>
                    <div className='count-item count-item--white count-item--sm'>
                      <span className='count-item__number'>50+</span>
                      <span className='count-item__text'><FormattedMessage id='export' /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container>
        <div className='mx-auto px-10'>
          <section className='section about-info'>
            <div className='about-info-content'>
              <div className='about-info-content-left'>
                <h4 className="title title--xl fade-up active"
                  data-scroll=""
                  data-scroll-offset="0.25"
                  data-scroll-class="fade-up-active"
                  data-scroll-repeat="">
                  <FormattedMessage id='title_top' />
                  <span className="gray"><FormattedMessage id='title_alt' /></span>
                </h4>
                <p className="text fade-up active" data-scroll="" data-scroll-offset="0.25" data-scroll-class="fade-up-active" data-scroll-repeat="">
                  <FormattedMessage id='desc' />
                </p>
              </div>
              <div className='about-info-content-img'>
                <img className="fade-up active" loading="lazy" src="/img/about-4.png" data-scroll="" data-scroll-offset="0.1" data-scroll-offset-mobile="0.03" data-scroll-class="fade-up-active" data-scroll-repeat="" />
              </div>
            </div>
          </section>
        </div>
      </Container>
      {/* <section className='section-video' style={`background-image: ${about_bg}`}></section> */}
      <section className='section-video' style={{ backgroundImage: `url("/img/about_bg.webp")` }}>
        <div className='content-video t-center p-t-170 p-b-170'>
          <div className='btn-play ab-center size16 hov-pointer m-l-r-auto m-t-43 m-b-33'>
            {/* <button onClick={handleOpenChange} className='flex-c-m sizefull bo-cir bgwhite color1 hov1 trans-0-4'>
              <FaPlay />
            </button> */}
            {/* <VideoModal video_url={video_1} /> */}
            <VideoModal video_url={video_1} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

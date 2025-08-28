"use client";
import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import "../../styles/footer.css";
import { FaInstagram, FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

import { routesMap } from '../../lib/routes';
import { getProductCategoryUrl } from '@/lib/routeHelpers';
import { fetchCategories, setSelectedCategoryId } from '@/redux/categorySlice';

export default function Footer() {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const { categories, isFetched, loading } = useSelector((state) => state.category);

  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, isFetched]);

  const titlekey = `title_${language}`;

  const Skeleton = ({ className = "" }) => (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-gray-200/20 dark:bg-gray-700/20 rounded-md ${className}`}
    />
  );

  return (
    <footer className="footer ">
      {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 p-8"> */}
      <div className='footer-left'>
        <img
          className='w-[90px] h-[56px] object-contain'
          src="https://nutsroastermachine.com/frontend/images/logo-light.png"
          alt=""
        />
        <br />
        <p className="min-h-[60px] mt-4">
          <FormattedMessage id='footerText' />
        </p>
        <br />
        <div className='socials'>
          <a href="https://www.instagram.com/eformachine/?hl=tr">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.facebook.com/efor.nutsroasting.5/">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.youtube.com/channel/UCpafStYHEBfM-_aZPituvQw?sub_confirmation=1">
            <FaYoutube size={24} />
          </a>
          <a href="https://tr.linkedin.com/company/eformakine">
            <FaLinkedinIn size={24} />
          </a>
        </div>
      </div>

      {/* Sağ kolon - Menüler */}
      <ul className='footer-right contact'>
        <li className='contact-box'>
          <h6 className='contact__box-title'><FormattedMessage id='urunler' /></h6>
          <ul className="box">
            {loading || !isFetched
              ? [...Array(6)].map((_, i) => (
                <li key={i} className="min-h-8 flex items-center">
                  <Skeleton className="h-4 w-28" />
                </li>
              ))
              : categories.map((item) => (
                <li key={item.id} className="min-h-8 flex items-center">
                  <Link
                    href={getProductCategoryUrl(language, item[`slug_${language}`])}
                    onClick={() => dispatch(setSelectedCategoryId(item.id))}
                    className="hover:text-gray-300 transition-colors duration-200"
                  >
                    {item[titlekey]}
                  </Link>
                </li>
              ))}
          </ul>
        </li>

        {/* Hızlı Menü */}
        <li className='features contact-box'>
          <h6 className='contact__box-title'><FormattedMessage id='hizlimenu' /></h6>
          <ul className='box'>
            {Object.entries(routesMap).map(([key, value]) => (
              <li key={key} style={{ minHeight: '32px', display: 'flex', alignItems: 'center' }}>
                <Link
                  href={value[language]}
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  <FormattedMessage id={key} />
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* İletişim Bilgileri */}
        <li className='contact-box'>
          <h6 className='contact__box-title'>
            <svg className="contact-box-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M7.37584 4.85915C8.65549 3.61971 10.1969 3 12 3C13.8031 3 15.3372 3.61267 16.6023 4.83803C17.8675 6.06339 18.5 7.54929 18.5 9.29577C18.5 10.169 18.2746 11.169 17.8238 12.2958C17.373 13.4225 16.8277 14.4789 16.1879 15.4648C15.5481 16.4507 14.9156 17.3732 14.2903 18.2324C13.665 19.0916 13.1342 19.7746 12.698 20.2817L12 21C11.8255 20.8028 11.5928 20.5423 11.302 20.2183C11.0112 19.8944 10.4877 19.2465 9.73154 18.2746C8.97539 17.3028 8.31376 16.3592 7.74664 15.4437C7.17953 14.5282 6.66331 13.493 6.19799 12.338C5.73266 11.1831 5.5 10.169 5.5 9.29577C5.5 7.54929 6.12527 6.07043 7.37584 4.85915Z"
                  stroke="#F09114" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M13 9.5C13 10.0523 12.5523 10.5 12 10.5C11.4477 10.5 11 10.0523 11 9.5C11 8.94772 11.4477 8.5 12 8.5C12.5523 8.5 13 8.94772 13 9.5Z"
                  stroke="#F09114" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <FormattedMessage id='adres' />
          </h6>
          <ul className='box'>
            <li>
              <a href="">Eskihisar mah. 8000 sok No:21 /1 Merkezefendi Denizli</a>
            </li>
          </ul>
          <br />

          <h6 className='contact__box-title'>
            <svg width="36" height="36" fill="#F09114" viewBox="0 0 34 34" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <title>@lang('anasayfa.telefon')</title>
                <path
                  d="M30.637 23.152c-0.109-0.676-0.334-1.282-0.654-1.825l0.013 0.024c-0.114-0.186-0.301-0.317-0.521-0.353l-0.004-0.001-8.969-1.424c-0.035-0.006-0.076-0.009-0.117-0.009-0.207 0-0.395 0.083-0.531 0.218l0-0c-0.675 0.68-1.194 1.516-1.496 2.45l-0.012 0.044c-4.015-1.64-7.139-4.765-8.742-8.674l-0.038-0.105c0.977-0.315 1.814-0.833 2.493-1.509l-0 0c0.136-0.136 0.22-0.324 0.22-0.531 0-0.041-0.003-0.081-0.010-0.121l0.001 0.004-1.423-8.97c-0.037-0.225-0.169-0.413-0.353-0.524l-0.003-0.002c-0.505-0.3-1.094-0.52-1.723-0.626l-0.030-0.004c-0.283-0.072-0.608-0.113-0.943-0.113-0.063 0-0.126 0.001-0.189 0.004l0.009-0c-3.498 0.025-6.326 2.855-6.348 6.351v0.002c0.015 12.761 10.355 23.102 23.115 23.116h0.001c3.5-0.021 6.332-2.852 6.354-6.349v-0.002c0-0.025 0.001-0.054 0.001-0.084 0-0.35-0.037-0.691-0.106-1.021l0.006 0.032zM24.383 29.076c-11.933-0.014-21.602-9.684-21.616-21.615v-0.001c0.019-2.674 2.182-4.836 4.855-4.854h0.002c0.014-0 0.030-0 0.046-0 0.275 0 0.544 0.030 0.802 0.086l-0.025-0.005c0.367 0.060 0.695 0.162 1.002 0.301l-0.025-0.010 1.301 8.201c-0.628 0.529-1.404 0.902-2.257 1.051l-0.029 0.004c-0.355 0.064-0.62 0.37-0.62 0.739 0 0.088 0.015 0.172 0.043 0.25l-0.002-0.005c1.773 5.072 5.696 8.994 10.646 10.73l0.121 0.037c0.073 0.026 0.157 0.041 0.244 0.041 0.14 0 0.272-0.038 0.384-0.105l-0.003 0.002c0.186-0.111 0.318-0.295 0.357-0.511l0.001-0.005c0.153-0.883 0.526-1.66 1.061-2.296l-0.006 0.007 8.201 1.303c0.133 0.296 0.238 0.641 0.297 1.001l0.003 0.024c0.045 0.212 0.071 0.455 0.071 0.704 0 0.024-0 0.049-0.001 0.073l0-0.004c-0.016 2.675-2.179 4.839-4.852 4.857h-0.002z">
                </path>
              </g>
            </svg>
            <FormattedMessage id='telefon' />
          </h6>

          <ul className='box'>
            <li><a href="">0(258) 241 10 60</a></li>
            <li><a href="">0(532) 567 10 60</a></li>
          </ul>
          <br />

          <h6 className='contact__box-title'>
            <svg width="40" height="40" viewBox="0 0 28 24" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M8.39646 3H15.6035C16.7056 2.99999 17.5944 2.99998 18.3138 3.05972C19.0547 3.12125 19.7049 3.25126 20.3049 3.56293C21.2181 4.03731 21.9627 4.78191 22.4371 5.69513C22.7487 6.29513 22.8788 6.94535 22.9403 7.68616C23 8.40556 23 9.29444 23 10.3965V13.6035C23 14.7056 23 15.5944 22.9403 16.3138C22.8788 17.0547 22.7487 17.7049 22.4371 18.3049C21.9627 19.2181 21.2181 19.9627 20.3049 20.4371C19.7049 20.7487 19.0547 20.8788 18.3138 20.9403C17.5944 21 16.7056 21 15.6035 21H8.39649C7.29444 21 6.40557 21 5.68616 20.9403C4.94535 20.8788 4.29513 20.7487 3.69513 20.4371C2.78191 19.9627 2.03731 19.2181 1.56293 18.3049C1.25126 17.7049 1.12125 17.0547 1.05972 16.3138C0.999982 15.5944 0.99999 14.7056 1 13.6035V10.3965C0.99999 9.29442 0.999982 8.40556 1.05972 7.68616C1.12125 6.94535 1.25126 6.29513 1.56293 5.69513C2.03731 4.78191 2.78191 4.03731 3.69513 3.56293C4.29513 3.25126 4.94535 3.12125 5.68616 3.05972C6.40556 2.99998 7.29442 2.99999 8.39646 3ZM5.25274 5.1305C6.10138 5.32962 6.88918 5.7516 7.53017 6.36207L10.469 9.16092C10.8754 9.54798 11.1374 9.7965 11.3523 9.97018C11.5575 10.1361 11.6541 10.178 11.7075 10.1944C11.8982 10.2527 12.1018 10.2527 12.2925 10.1944C12.3459 10.178 12.4425 10.1361 12.6477 9.97018C12.8626 9.7965 13.1246 9.54798 13.531 9.16092L16.4698 6.36207C17.1108 5.7516 17.8986 5.32962 18.7473 5.1305C18.5792 5.09823 18.3828 5.07234 18.1483 5.05286C17.5214 5.0008 16.7158 5 15.56 5H8.44C7.28423 5 6.47856 5.0008 5.85168 5.05286C5.61716 5.07234 5.42078 5.09823 5.25274 5.1305ZM20.8106 7H19.875C19.1207 7 18.3953 7.29015 17.8491 7.81035L14.8828 10.6355C14.5118 10.9888 14.1908 11.2945 13.9051 11.5255C13.6027 11.77 13.276 11.985 12.8774 12.1069C12.3055 12.2818 11.6945 12.2818 11.1226 12.1069C10.724 11.985 10.3973 11.77 10.0949 11.5255C9.80922 11.2945 9.48823 10.9888 9.1172 10.6354L6.15086 7.81035C5.60466 7.29015 4.87928 7 4.125 7H3.18942C3.12859 7.21664 3.08303 7.48842 3.05286 7.85168C3.0008 8.47856 3 9.28423 3 10.44V13.56C3 14.7158 3.0008 15.5214 3.05286 16.1483C3.10393 16.7632 3.19909 17.116 3.33776 17.3829C3.62239 17.9309 4.06915 18.3776 4.61708 18.6622C4.88403 18.8009 5.23678 18.8961 5.85168 18.9471C6.47856 18.9992 7.28423 19 8.44 19H15.56C16.7158 19 17.5214 18.9992 18.1483 18.9471C18.7632 18.8961 19.116 18.8009 19.3829 18.6622C19.9309 18.3776 20.3776 17.9309 20.6622 17.3829C20.8009 17.116 20.8961 16.7632 20.9471 16.1483C20.9992 15.5214 21 14.7158 21 13.56V10.44C21 9.28423 20.9992 8.47856 20.9471 7.85168C20.917 7.48842 20.8714 7.21664 20.8106 7Z"
                  fill="#F09114"></path>
              </g>
            </svg>
            <FormattedMessage id='email' />
          </h6>
          <ul className='box'>
            <li>
              <a href="mailto:info@eformaksan.com" className="hover:text-gray-300 transition-colors duration-200">
                info@eformaksan.com
              </a>
            </li>
          </ul>
        </li>
      </ul>

      <div className="footer-bottom text-center py-4 border-t border-gray-700" style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>
          <FormattedMessage id='copyright' /> &copy; 2024
        </p>
      </div>
    </footer>

  );
}
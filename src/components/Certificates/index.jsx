'use client';
import React, { useState } from 'react';
import { CertificatesData } from './data';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import style from './style.module.css';
import 'yet-another-react-lightbox/styles.css';

import Lightbox from 'yet-another-react-lightbox';
import Container from '../Container/container';

const certificates = [
  {
    bigImage: 'frontend/images/sertifikalar/belge-büyük/iso-9001.webp',
    logoImage: 'frontend/images/sertifikalar/logo/iso-9001-logo.webp',
    certificateImage: 'frontend/images/sertifikalar/belge/iso-9001-belge.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/belge-büyük/ISO 10002-1.webp',
    logoImage: 'frontend/images/sertifikalar/logo/iso-10002-logo.webp',
    certificateImage: 'frontend/images/sertifikalar/belge/iso-10002-belge.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/belge-büyük/ISO 14001-1.webp',
    logoImage: 'frontend/images/sertifikalar/logo/iso-14001-logo.webp',
    certificateImage: 'frontend/images/sertifikalar/belge/iso-14001-belge.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/belge-büyük/ISO 45001-1.webp',
    logoImage: 'frontend/images/sertifikalar/logo/iso-45001-logo.webp',
    certificateImage: 'frontend/images/sertifikalar/belge/iso-45001-belge.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/logo/ce-logo.webp',
    logoImage: 'frontend/images/sertifikalar/logo/ce-logo.webp',
    certificateImage: 'frontend/images/sertifikalar/logo/ce-logo.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/logo/etl.webp',
    logoImage: 'frontend/images/sertifikalar/logo/etl.webp',
    certificateImage: 'frontend/images/sertifikalar/logo/etl.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/logo/eac.webp',
    logoImage: 'frontend/images/sertifikalar/logo/eac.webp',
    certificateImage: 'frontend/images/sertifikalar/logo/eac.webp',
  },
  {
    bigImage: 'frontend/images/sertifikalar/logo/saso.webp',
    logoImage: 'frontend/images/sertifikalar/logo/saso.webp',
    certificateImage: 'frontend/images/sertifikalar/logo/saso.webp',
  },
];

function Certificates() {
  const language = useSelector((state) => state.language.language);
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = certificates.map((item) => ({
    src: `https://nutsroastermachine.com/${item.bigImage}`,
  }));

  const openLightbox = (i) => {
    setIndex(i);
    setIsOpen(true);
  };

  return (
    <Container>
      <div className='mx-auto max-sm:px-0 max-sm:overflow-hidden px-80 mb-10'>
        <div className='text-center mb-3'>
          <span className='font-bold capitalize color-1 text-5xl'>
            <FormattedMessage id='CertificatesMessages.title' />
          </span>
        </div>
        <div className={style['our-clients']}>
          <ul className='text-center items-center justify-center grid grid-cols-4 max-sm:grid-cols-2 gap-0'>
            {certificates.map((item, idx) => (
              <li key={idx} onClick={() => openLightbox(idx)} className='cursor-pointer'>
                <img
                  src={`https://nutsroastermachine.com/${item.logoImage}`}
                  alt=""
                />
                <img
                  src={`https://nutsroastermachine.com/${item.certificateImage}`}
                  alt=""
                />
              </li>
            ))}
          </ul>
        </div>

        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          slides={slides}
          index={index}
          on={{ view: ({ index }) => setIndex(index) }}
        />
      </div>
    </Container>
  );
}

export default Certificates;

'use client';

import React from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { FormattedMessage, useIntl } from 'react-intl';
import { contactData } from './data';
import { useSelector } from 'react-redux';

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

const phoneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
        <path d="M16.5562 12.9062L16.1007 13.359C16.1007 13.359 15.0181 14.4355 12.0631 11.4972C9.10812 8.55901 10.1907 7.48257 10.1907 7.48257L10.4775 7.19738C11.1841 6.49484 11.2507 5.36691 10.6342 4.54348L9.37326 2.85908C8.61028 1.83992 7.13596 1.70529 6.26145 2.57483L4.69185 4.13552C4.25823 4.56668 3.96765 5.12559 4.00289 5.74561C4.09304 7.33182 4.81071 10.7447 8.81536 14.7266C13.0621 18.9492 17.0468 19.117 18.6763 18.9651C19.1917 18.9171 19.6399 18.6546 20.0011 18.2954L21.4217 16.883C22.3806 15.9295 22.1102 14.2949 20.8833 13.628L18.9728 12.5894C18.1672 12.1515 17.1858 12.2801 16.5562 12.9062Z" fill="#1C274C" />
    </svg>
);

const emailIcon = (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 8L8.44992 11.6333C9.73295 12.4886 10.3745 12.9163 11.0678 13.0825C11.6806 13.2293 12.3194 13.2293 12.9322 13.0825C13.6255 12.9163 14.2671 12.4886 15.5501 11.6333L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const contacts = [
    {
        icon: "/img/iletisim/muhasebe-icon.webp",
        titleId: "muhasebe",
        subtitleId: "muhasebeSorumlusu",
        phone: "+90 531 557 39 40",
        email: "muhasebe@eformaksan.com"
    },
    {
        icon: "/img/iletisim/yonetici-icon.webp",
        titleId: "yonetici",
        subtitleId: "yonetici",
        phone: "+90 532 567 10 60",
        email: "yakup.akinci@eformaksan.com"
    },
    {
        icon: "/img/iletisim/info-icon.webp",
        titleId: "bilgi",
        subtitleId: "bilgiAciklama",
        phone: "+90 533 033 81 39",
        email: "info@eformaksan.com"
    },
    {
        icon: "/img/iletisim/english-marketing.webp",
        titleId: "satisPazarlama",
        subtitleId: "ingilizce",
        phone: "+90 531 557 40 50",
        email: "sales@eformaksan.com"
    },
    {
        icon: "/img/iletisim/arabic-marketing.webp",
        titleId: "satisPazarlama",
        subtitleId: "arapca",
        phone: "+90 533 596 10 64",
        email: "export@eformaksan.com"
    },
    {
        icon: "/img/iletisim/russian-marketing.webp",
        titleId: "satisPazarlama",
        subtitleId: "rusca",
        phone: "+90 533 033 84 09",
        email: "marketing@eformaksan.com"
    }
];

function ContactCard({ icon, titleId, subtitleId, phone, email }) {
    return (
        <div className='rounded-2xl items-center flex flex-col justify-center text-center border border-zinc-200 pt-5 pb-5 overflow-hidden'>
            <div className='mb-6 h-20 w-20 relative block'>
                <img src={icon} alt="" />
            </div>
            <div className='flex flex-col'>
                <h4 className={`${oswald.className} text-xl font-bold mb-1`}><FormattedMessage id={titleId} /></h4>
                <p className='font-bold mb-1'><FormattedMessage id={subtitleId} /></p>
                <Link className='flex justify-center items-center mb-1' href={`tel:${phone}`}>
                    {phoneIcon}
                    <p className='ml-1'>{phone}</p>
                </Link>
                <Link className='flex justify-center text-xs sm:text-md md:text-md lg:text-md items-center' href={`mailto:${email}`}>
                    {emailIcon}
                    <p className='ml-1'>{email}</p>
                </Link>
            </div>
        </div>
    );
}

export default function ContactItem() {
    const language = useSelector((state) => state.language.language);

    return (
        <div className='max-w-7xl mx-auto mb-20'>
            <div className='p-4 sm:p-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {contacts.map((contact, idx) => (
                    <ContactCard key={idx} {...contact} />
                ))}
            </div>
        </div>
    );
}

import React from 'react'

import ContactForm from '@/components/ContactForm/contactForm';
import Map from '@/components/Map';
import ContactItem from '@/components/ContactItem/contactItem';
import { getPageSeoData, getSeoData } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const seoData = await getSeoData();
  const pageSeo = getPageSeoData(seoData, lang, 'iletisim')

  return {
    title: pageSeo?.title || 'İletişim | Efor Makina',
    description: pageSeo?.description || 'İletişim | Efor Makina.',
    keywords: pageSeo?.keywords || 'efor makina',
    openGraph: {
      title: pageSeo?.title || 'İletişim | Efor Makina',
      description: pageSeo?.description || 'İletişim | Efor Makina.',
      keywords: pageSeo?.keywords || 'efor makina',
    },
  }
}

function Contact() {
  return (
    <div className="mt-20 mb-20">
      <ContactForm />
      <ContactItem />
      <Map />
    </div>
  )
}

export default Contact

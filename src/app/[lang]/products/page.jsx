import React from 'react'

import ProductCategories from '@/components/Products'
import { getSeoData, getPageSeoData } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const seoData = await getSeoData();
  const pageSeo = getPageSeoData(seoData, lang, 'urunler')

  return {
    title: pageSeo?.title || 'Kurumsal | Efor Makina',
    description: pageSeo?.description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
    keywords: pageSeo?.keywords || 'hakkımızda, tarihçe, misyon, vizyon',
    openGraph: {
      title: pageSeo?.title || 'Kurumsal | Efor Makina',
      description: pageSeo?.description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
      images: pageSeo?.image ? [{ url: pageSeo.image }] : [],
    },
  }
}

function Products() {
  return (
    <ProductCategories />
  )
}

export default Products
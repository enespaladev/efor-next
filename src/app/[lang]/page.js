import Home from './home';
import { Suspense } from 'react';
import { getSeoData, getPageSeoData } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const {lang} = await params;
  const seoData = await getSeoData();
  const pageSeo = getPageSeoData(seoData, lang, 'anasayfa')

  return {
    title: pageSeo?.title || 'Efor Makina',
    description: pageSeo?.description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
    keywords: pageSeo?.keywords || 'hakkımızda, tarihçe, misyon, vizyon',
    openGraph: {
      title: pageSeo?.title || 'Efor Makina',
      description: pageSeo?.description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
      images: pageSeo?.image ? [{ url: pageSeo.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'tr' },
    { lang: 'ru' },
    { lang: 'ar' },
  ];
}

export default async function HomePage() {
  return (
    <Suspense fallback={null}>
      <Home/>
    </Suspense>
  );
}

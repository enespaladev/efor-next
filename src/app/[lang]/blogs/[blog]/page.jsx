import BlogDetailPageComponent from '@/components/BlogPage/BlogDetailPageComponent'
import { getSeoData, getPageSeoData } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const seoData = await getSeoData();
  const pageSeo = getPageSeoData(seoData, lang, 'blog_detay');

  return {
    title: pageSeo?.title || 'Blog | Efor Makina',
    description: pageSeo?.description || 'Bloglarımız | Efor Makina.',
    keywords: pageSeo?.keywords || 'efor makina',
    openGraph: {
      title: pageSeo?.title || 'Blog | Efor Makina',
      description: pageSeo?.description || 'Bloglarımız | Efor Makina.',
      keywords: pageSeo?.keywords || 'efor makina',
    },
  }
}

export default function Page({ params }) {
  return <BlogDetailPageComponent />;
}

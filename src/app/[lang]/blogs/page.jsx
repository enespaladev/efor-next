import React from 'react'

import BlogPage from '@/components/BlogPage/blogPage';
import { getSeoData, getPageSeoData } from '@/lib/seoUtils';

export async function generateMetadata({ params }) {
  const { lang } = params;
  const seoData = await getSeoData();
  const pageSeo = getPageSeoData(seoData, lang, 'blog')

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

function Blog() {
  return (
    <div>
      <BlogPage />
    </div>
  )
}

export default Blog
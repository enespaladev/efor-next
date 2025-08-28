// lib/routeHelpers.js

export const getProductCategoryUrl = (lang, slug) => {
  const basePaths = {
    en: '/en/products/',
    tr: '/tr/urunler/',
    ru: '/ru/products-ru/',
    ar: '/ar/products-ar/',
    fr: '/fr/produits/',
  };
  return `${basePaths[lang]}${slug}`;
};

export const getProductDetailUrl = (lang, categorySlug, productSlug) => {
  const basePaths = {
    en: '/en/products/',
    tr: '/tr/urunler/',
    ru: '/ru/products-ru/',
    ar: '/ar/products-ar/',
    fr: '/fr/produits/',
  };

  return `${basePaths[lang]}${categorySlug}/${productSlug}`;
};

export const getBlogDetailUrl = (lang, slug) => {
  const basePaths = {
    en: '/en/blogs/',
    tr: '/tr/blogs/',
    ru: '/ru/blogs-ru/',
    ar: '/ar/blogs-ar/',
    fr: '/fr/blogs-fr/',
  };
  return `${basePaths[lang]}${slug}`;
};

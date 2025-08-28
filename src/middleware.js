import { NextResponse } from 'next/server';

const locales = ['tr', 'en', 'ru', 'ar', 'fr'];
const defaultLocale = 'en';

// Dil bazlı özel sayfa eşlemeleri
const routeMappings = {
  corporate: {
    en: 'corporate',
    tr: 'kurumsal',
    ru: 'corporate-ru',
    ar: 'corporate-ar',
    fr: 'corporate-fr'
  },
  blogs:{
    en: 'blogs',
    tr: 'blogs',
    ru: 'blogs-ru',
    ar: 'blogs-ar',
    fr: 'blogs-fr'
  },
  products: {
    en: 'products',
    tr: 'urunler',
    ru: 'products-ru',
    ar: 'products-ar',
    fr: 'produits' 
  },
  contact: {
    en: 'contact',
    tr: 'iletisim',
    ru: 'contact-ru',
    ar: 'contact-ar',
    fr: 'contact-fr'
  }
  // Diğer sayfalarınızı buraya ekleyin
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Bypass edilecek yollar
  const shouldBypass = [
    '/_next/',
    '/api/',
    '/favicon.ico',
    '/assets/',
    '/img/',
    '/fonts/',
    '/sitemap',
    '/robots.txt'
  ].some(path => pathname.startsWith(path));

  if (shouldBypass) {
    return NextResponse.next();
  }

  // URL'den mevcut dili ve path'i ayır
  const pathParts = pathname.split('/').filter(Boolean);
  const currentLocale = locales.includes(pathParts[0]) ? pathParts[0] : null;
  const slug = currentLocale ? pathParts.slice(1).join('/') : pathname.slice(1);

  // 1. Dil değiştirme isteği kontrolü
  if (
    currentLocale &&
    locales.some(locale => slug.startsWith(`${locale}/`) || slug === locale)
  ) {
    const newLocale = slug.split('/')[0];
    const newPath = `/${newLocale}/${slug.split('/').slice(1).join('/')}`;
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // 2. Eksik dil durumu
  if (!currentLocale) {
    const acceptLanguage = request.headers.get('accept-language');
    const userLocale = acceptLanguage?.split(',')[0]?.split('-')[0];
    const preferredLocale = locales.includes(userLocale) ? userLocale : defaultLocale;

    // Mevcut sayfanın yeni dildeki karşılığını bul
    let newPath = `/${preferredLocale}`;
    if (slug) {
      for (const [routeKey, translations] of Object.entries(routeMappings)) {
        for (const [lang, path] of Object.entries(translations)) {
          if (slug === path || slug.startsWith(`${path}/`)) {
            const slugAfter = slug.split('/').slice(1).join('/');
            newPath = slugAfter
              ? `/${preferredLocale}/${routeMappings[routeKey][preferredLocale]}/${slugAfter}`
              : `/${preferredLocale}/${routeMappings[routeKey][preferredLocale]}`;
            break;
          }
        }
      }
    }

    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // 3. Özel URL eşleştirme (rewrite işlemi)
  if (slug) {
    for (const [routeKey, translations] of Object.entries(routeMappings)) {
      if (
        translations[currentLocale] &&
        (slug === translations[currentLocale] || slug.startsWith(`${translations[currentLocale]}/`))
      ) {
        const slugParts = slug.split('/');
        const slugAfter = slugParts.slice(1).join('/');

        const newPathname = slugAfter
          ? `/${currentLocale}/${routeKey}/${slugAfter}`
          : `/${currentLocale}/${routeKey}`;

        return NextResponse.rewrite(new URL(newPathname, request.url));
      }
    }
  }

  return NextResponse.next();
}

// Bu yapı dışındaki tüm yolları middleware'e dahil et
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|img|fonts|sitemap|robots.txt).*)',
  ],
};

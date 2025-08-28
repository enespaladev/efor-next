import { routesMap } from '../lib/routes';
import { store } from '@/redux/store';

export const changeRouteLanguage = (currentPath, newLang) => {
  const currentLang = currentPath.startsWith('/tr')
    ? 'tr'
    : currentPath.startsWith('/en')
    ? 'en'
    : currentPath.startsWith('/ru')
    ? 'ru'
    : currentPath.startsWith('/fr')
    ? 'fr'
    : 'ar';

  const pathParts = currentPath.split('/').filter(Boolean); // ['', 'tr', 'urunler', 'kategori-slug', 'urun-slug']
  const currentLangRoute = pathParts[1]; // örn: 'urunler', 'corporate'
  const slug1 = pathParts[2]; // kategori slug (ya da route base)
  const slug2 = pathParts[3]; // ürün slug (varsa)

  // 1. doğru routeKey'i bul
  let matchedRouteKey = null;
  for (let key in routesMap) {
    if (routesMap[key][currentLang]?.replace(`/${currentLang}/`, '') === currentLangRoute) {
      matchedRouteKey = key;
      break;
    }
  }

  if (!matchedRouteKey) {
    return routesMap.home[newLang]; // fallback
  }

  const state = store.getState();
  const categories = state.category.categories;
  const products = state.product.products;

  // 2. Ürün detay sayfası mı?
  if (matchedRouteKey === 'products' && slug1 && slug2) {
    // kategori slug çevirisi
    const matchedCategory = categories.find((cat) => cat[`slug_${currentLang}`] === slug1);
    const newCategorySlug = matchedCategory ? matchedCategory[`slug_${newLang}`] : slug1;

    // ürün slug çevirisi
    const matchedProduct = products.find((p) => p[`slug_${currentLang}`] === slug2);
    const newProductSlug = matchedProduct ? matchedProduct[`slug_${newLang}`] : slug2;

    const basePath = routesMap[matchedRouteKey][newLang]; // örn: /en/products
    return `${basePath}/${newCategorySlug}/${newProductSlug}`;
  }

  // 3. Sadece kategori sayfasıysa (slug1 var ama slug2 yok)
  if (matchedRouteKey === 'products' && slug1) {
    const matchedCategory = categories.find((cat) => cat[`slug_${currentLang}`] === slug1);
    const newCategorySlug = matchedCategory ? matchedCategory[`slug_${newLang}`] : slug1;

    const basePath = routesMap[matchedRouteKey][newLang];
    return `${basePath}/${newCategorySlug}`;
  }

  // 4. Diğer tüm sayfalarda yalnızca ana path'i değiştir
  return routesMap[matchedRouteKey][newLang];
};

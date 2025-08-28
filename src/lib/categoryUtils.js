import axios from "axios";

export async function getCategories() {
  try {
    const response = await axios.get("https://nutsroastermachine.com/api/categories");

    if (response.status !== 200) {
      throw new Error("Kategoriler alınamadı");
    }

    return response.data; // axios otomatik JSON parse eder
  } catch (error) {
    console.error("Kategori veri alma hatası:", error);
    return null;
  }
}

export async function getProducts() {
  try {
    const response = await fetch('https://nutsroastermachine.com/api/products', {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Ürünler alınamadı');
    }

    return await response.json();
  } catch (error) {
    console.error('Ürün veri alma hatası:', error);
    return null;
  }
}

export function getCategorySeoData(categories, lang, categorySlug) {
  if (!categories || !Array.isArray(categories)) return null;

  const category = categories.find(cat => cat[`slug_${lang}`] === categorySlug);
  if (!category) return null;

  const getValue = (key) => {
    const langKey = `${key}_${lang}`;
    return category[langKey] || category[key] || null;
  };

  console.log(getValue('seo_title'));

  return {
    title: getValue('seo_title'),
    description: getValue('seo_description'),
    keywords: getValue('seo_keywords'),
  };
}

export function getProductSeoData(products, lang, productSlug) {
  if (!products || !Array.isArray(products)) return null;

  const product = products.find(prod => prod.slug === productSlug);
  if (!product) return null;

  
  const getValue = (key) => {
    const langKey = lang === 'tr' ? key : `${key}_${lang}`;
    return product[langKey] || product[key] || null;
  };
  
  return {
    title: lang === "tr" ? getValue('title') : getValue(`title_${lang}`),
    description: getValue('short_description'),
    keywords: lang === "tr" ? getValue('seo_keywords') : getValue(`seo_keywords_${lang}`),
  };
}
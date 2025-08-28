export async function getSeoData() {
  try {
    const response = await fetch('https://nutsroastermachine.com/api/seo', {
      next: { revalidate: 3600 }, // 1 saat cache
      timeout: 5000
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('SEO veri alma hatası:', error);
    return {
      defaultTitle: "Kuruyemiş Kavurma Makinası",
      defaultDescription: "Profesyonel kuruyemiş kavurma makinaları",
      // ... diğer varsayılan değerler
    };
  }
}

export function getPageSeoData(seoData, lang, page = 'kurumsal') {
  if (!seoData) return null;

  const langKey = lang === 'tr' ? 'seo' : `seo_${lang}`; 
  const langData = seoData[langKey];

  if (!langData || !Array.isArray(langData) || langData.length === 0) {
    return null;
  }

  const data = langData[0]; // Array'in ilk elemanı

  const getValue = (key) => {
    return data[key] || null;
  };

  return {
    title: lang === "tr" ? getValue(`${page}_title`) : getValue(`${page}_title_${lang}`),
    description: lang === "tr" ? getValue(`${page}_description`) : getValue(`${page}_description_${lang}`),
    keywords: lang === "tr" ? getValue(`${page}_keywords`) : getValue(`${page}_keywords_${lang}`),
  };
}
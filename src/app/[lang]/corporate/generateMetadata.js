// app/[lang]/corporate/generateMetadata.js
export async function generateMetadata({ params }) {
    const { lang } = params;
  
    // API'den SEO verilerini çek
    try {
      const seoData = await fetch(`https://api.nutsroastermachine.com/api/seo`)
        .then(res => res.json());
  
      return {
        title: seoData.kurumsal_title || 'Kurumsal | Efor Makina',
        description: seoData.kurumsal_description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
        keywords: seoData.kurumsal_keywords || 'hakkımızda, tarihçe, misyon, vizyon',
        openGraph: {
          title: seoData.kurumsal_title || 'Kurumsal | Efor Makina',
          description: seoData.kurumsal_description || 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
          images: [
            {
              url: seoData.kurumsal_image || '/about-og-image.jpg',
              width: 800,
              height: 600,
            },
          ],
        },
      };
    } catch (error) {
      console.error('SEO verileri alınamadı:', error);
  
      // Fallback metadata
      return {
        title: 'Kurumsal | Efor Makina',
        description: 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
        keywords: 'hakkımızda, tarihçe, misyon, vizyon',
        openGraph: {
          title: 'Kurumsal | Efor Makina',
          description: 'Şirketimiz hakkında detaylı bilgi ve tarihçemiz.',
          images: [
            {
              url: '/about-og-image.jpg',
              width: 800,
              height: 600,
            },
          ],
        },
      };
    }
  }
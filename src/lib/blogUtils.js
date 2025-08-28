import axios from "axios";

export async function getBlogs() {
  try {
    const response = await axios.get("https://nutsroastermachine.com/api/blogs");

    if (response.status !== 200) {
      throw new Error("Kategoriler alınamadı");
    }

    return response.data; // axios otomatik JSON parse eder
  } catch (error) {
    console.error("Kategori veri alma hatası:", error);
    return null;
  }
}

export function getBlogSeoData(blogs, lang, blogSlug) {
  if (!blogs || !Array.isArray(blogs)) return null;

  const blog = blogs.find(blog => blog.slug === blogSlug);
  if (!blog) return null;

  
  const getValue = (key) => {
    const langKey = lang === 'tr' ? key : `${key}_${lang}`;
    return blog[langKey] || blog[key] || null;
  };
  
  return {
    title: lang === "tr" ? getValue('title') : getValue(`title_${lang}`),
    description: getValue('short_description'),
    keywords: lang === "tr" ? getValue('seo_keywords') : getValue(`seo_keywords_${lang}`),
  };
}
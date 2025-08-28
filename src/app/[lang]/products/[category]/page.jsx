import ProductList from '@/components/Products/product-list';
import { getCategories, getCategorySeoData } from '@/lib/categoryUtils';

export async function generateMetadata({ params }) {
  const { lang, category } = params;
  
  const categories = await getCategories();
  const categorySeo = getCategorySeoData(categories, lang, category);

  return {
    title: categorySeo?.title || `${category} Ürünleri | Efor Makina`,
    description: categorySeo?.description || `${category} kategorisindeki ürünlerimiz`,
  };
}

export default async function ProductCategoryPage({ params }) {
  return (
    <ProductList params={params} />
  );
}

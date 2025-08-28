import ProductDetail from '@/components/Products/productDetail';
import { getProducts, getProductSeoData } from '@/lib/categoryUtils';

export async function generateMetadata({ params }) {
  const { lang, category, product } = params;

  const products = await getProducts();
  const productSeo = getProductSeoData(products, lang, product);

  return {
    title: productSeo?.title || `${category} | Efor Makina`,
    description: productSeo?.description || `${category} kategorisindeki ürünlerimiz`,
    keywords: productSeo?.keywords || `${product}`
  };
}

export default async function ProductDetailPage({ params }) {
  return (
    <ProductDetail params={params} />
  );
}

'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
// import { fetchProductById, setSelectedProductId } from "@/redux/productSlice";
import { fetchProductById, fetchProductsByCategory, setSelectedProductId } from "@/redux/productSlice";
import { fetchCategories, setSelectedCategoryId } from "@/redux/categorySlice";

import './style.css';
import ModelViewer from "../ModelViewer";
import { ProductData } from "./data";
import { FormattedMessage, useIntl } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getProductDetailUrl } from "@/lib/routeHelpers";
import Link from "next/link";
import RtlHtml from "../RtlText/RtlHtml";
import axios from "axios";
import { Input } from "../ui/input";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Textarea } from "../ui/textarea";
import Swal from "sweetalert2";
import Container from "../Container/container";

const Skeleton = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={`animate-pulse bg-gray-200/80 dark:bg-gray-700/60 rounded-md ${className}`}
  />
);

const ProductDetailSkeleton = () => (
  <div className="flex flex-col justify-center items-center">
    <Container>
      <div className="pt-30 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-8">
          {/* Sol kolon skeletonları */}
          <div className="md:col-span-5 space-y-6">
            <Skeleton className="w-full h-[360px] rounded-xl" />   {/* Slider */}
            <Skeleton className="w-full h-[400px] rounded-xl" />   {/* ModelViewer */}
            <Skeleton className="w-full h-[400px] rounded-xl" />   {/* Video */}
          </div>

          {/* Sağ kolon skeletonları */}
          <div className="md:col-span-7 md:pl-4 lg:pl-6">
            {/* Başlık & özet */}
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-6" />

            {/* Açıklama paragrafları */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
            </div>

            {/* Boyutlar */}
            <Skeleton className="h-6 w-48 mt-6 mb-3" />
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="urun_detay_boyutlar_container p-3 rounded-lg border">
                  <Skeleton className="h-10 w-10 mb-2 rounded-full" />
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-5 w-24" />
                </div>
              ))}
            </div>

            {/* Elektrik bileşenleri */}
            <Skeleton className="h-6 w-64 mt-6 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>

            {/* Enerji özellikleri */}
            <Skeleton className="h-6 w-56 mt-6 mb-3" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="grid grid-cols-4 gap-3">
                  <Skeleton className="h-10 w-full col-span-1" />
                  <Skeleton className="h-10 w-full col-span-3" />
                </div>
              ))}
            </div>

            {/* Ürün kapasitesi tablosu */}
            <Skeleton className="h-6 w-60 mt-6 mb-3" />
            <div className="overflow-x-auto rounded-lg border border-gray-200 p-2">
              <div className="grid grid-cols-2 gap-2 min-w-[420px]">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    {/* Benzer ürünler skeletonları */}
    <Container>
      <div className="pb-10 px-4 md:px-6 lg:px-8 mt-10">
        <Skeleton className="h-6 w-44 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg border">
              <Skeleton className="w-full h-44 sm:h-52 rounded-md mb-3" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  </div>
);

function ProductDetailContent() {
  const params = useParams();
  // const categorySlug = params?.category;
  const categorySlug = params?.category;
  const productSlug = params?.product;
  const intl = useIntl();

  const dispatch = useDispatch();
  // const selectedProductId = useSelector((state) => state.product.selectedProductId);
  const selectedProductId = useSelector((state) => state.product.selectedProductId);
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const isLoading = useSelector((state) => state.product.isLoading);
  const language = useSelector((state) => state.language.language);
  const [loading, setLoading] = useState(false);
  // const { products } = useSelector((state) => state.product);
  const { products } = useSelector((state) => state.product);
  const { categories, isFetched: categoriesFetched, selectedCategoryId } = useSelector((state) => state.category);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [responseMsg, setResponseMsg] = useState(null);

  const [detectedCountry, setDetectedCountry] = useState('us');

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data && data.country_code) {
          setDetectedCountry(data.country_code.toLowerCase()); // örn: 'tr'
        }
      } catch (err) {
        console.error('Ülke tespiti yapılamadı:', err);
      }
    };

    detectCountry();
  }, []);

  useEffect(() => {
    if (!categoriesFetched) {
      dispatch(fetchCategories());
    }
  }, [categoriesFetched, dispatch]);

  useEffect(() => {
    if (!selectedCategoryId && categories?.length && categorySlug) {
      const slugFields = ['slug', `slug_${language}`];
      const foundCat = categories.find(c => slugFields.some(f => c?.[f] === categorySlug));
      if (foundCat?.id) {
        dispatch(setSelectedCategoryId(foundCat.id));
      }
    }
  }, [selectedCategoryId, categories, categorySlug, language, dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(fetchProductsByCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  useEffect(() => {
    // Eğer storage/Redux'ta id yoksa ve kategori ürünleri geldiyse, slug'tan id bul
    if (!selectedProductId && products?.length && productSlug) {
      const slugFields = ['slug', `slug_${language}`];
      const found = products.find(p => slugFields.some(f => p?.[f] === productSlug));
      if (found?.id) {
        dispatch(setSelectedProductId(found.id));
        dispatch(fetchProductById(found.id));
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('selectedProductId', found.id);
        }
      }
    }
  }, [selectedProductId, products, productSlug, language, dispatch]);


  useEffect(() => {
    const storedId = typeof window !== "undefined" ? sessionStorage.getItem("selectedProductId") : null;
    if (storedId && !selectedProductId) {
      dispatch(setSelectedProductId(storedId));
      dispatch(fetchProductById(storedId));
    } else if (selectedProductId) {
      dispatch(fetchProductById(selectedProductId));
    }
  }, [dispatch, selectedProductId]);

  useEffect(() => {
    if (isPopupOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [isPopupOpen]);

  useEffect(() => {
    if (!responseMsg) return;

    Swal.fire({
      icon: responseMsg.type,
      title: responseMsg.type === 'success' ? <FormattedMessage id="success" /> : <FormattedMessage id="error" />,
      text: responseMsg.text,
      confirmButtonColor: responseMsg.type === 'success' ? '#10b981' : '#ef4444'
    }).then(() => {
      // Başarılıysa popup'ı kapat, mesajı temizle
      if (responseMsg.type === 'success') {
        setIsPopupOpen(false);
      }
      setResponseMsg(null);
    });
  }, [responseMsg]);

  const showSkeleton =
    isLoading || (!selectedProduct && (!products || products.length === 0));

  // --- DEĞİŞTİR ---
  if (showSkeleton) return <ProductDetailSkeleton />;
  // --- /DEĞİŞTİR ---

  if (!selectedProduct) return <p className="p-4">Ürün bulunamadı.</p>;

  const Images = selectedProduct.photo?.split(',') ?? [];
  const urun_tipi = selectedProduct.product_type?.split(',') ?? [];

  const isNil = (v) => v === null || v === undefined;
  const hasText = (v) => typeof v === "string" ? v.trim().length > 0 : !isNil(v);

  const ProductDimension = ({ measure, icon, labelId, value }) => {
    const showIcon = !!icon;
    const showLabel = hasText(labelId);
    const showValue = (typeof value === "number") || hasText(value);
    const showMeasure = hasText(measure);
    if (!showIcon && !showLabel && !showValue && !showMeasure) return null;

    return (
      <div className="urun_detay_boyutlar_container">
        {showIcon && <div className="urun_detay_boyutlar_sol">{icon}</div>}
        <div className="urun_detay_boyutlar_sag">
          {showLabel && (
            <h6 className="urun_detay_boyutlar_sag_baslik">
              <FormattedMessage id={labelId} />
            </h6>
          )}
          {showValue && (
            <h5 className="urun_detay_boyutlar_yazi">
              {value === "Opsiyonel" ? (
                <FormattedMessage id="opsiyonel" />
              ) : (
                <>
                  {value}
                  {showMeasure && <> <FormattedMessage id={measure} /></>}
                </>
              )}
            </h5>
          )}
        </div>
      </div>
    );
  };

  const dimensions = [
    {
      labelId: "uzunluk",
      measure: "mm",
      value: selectedProduct.length,
      icon: (
        <svg style={{ transform: "rotate(30deg)" }} width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 12L7 8M3 12L7 16M21 12L17 16M21 12L17 8" stroke="#f3932c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      labelId: "genislik",
      value: selectedProduct.width,
      measure: "mm",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M3 12H21M3 12L7 8M3 12L7 16M21 12L17 16M21 12L17 8" stroke="#f3932c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      labelId: "yukseklik",
      value: selectedProduct.height,
      measure: "mm",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 3V21M12 3L16 7M12 3L8 7M12 21L8 17M12 21L16 17" stroke="#f3932c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
  ];

  const Pill = ({ title, children }) => (
    <div className="urun_detay_boyutlar_container">
      <div className="urun_detay_boyutlar_sag">
        <h6 className="urun_detay_boyutlar_sag_baslik">{title}</h6>
        <h5 className="urun_detay_boyutlar_yazi">{children}</h5>
      </div>
    </div>
  );

  const FuelTypePill = ({ value }) => <Pill title={<FormattedMessage id="yakit_tipi" />}>{value}</Pill>;

  const EnergyRow = ({ fuelLabelId, metrics = [] }) => {
    const items = metrics.filter(m => m && (m.value || m.value === 0));
    if (items.length === 0) return null;

    return (
      <div className="md:grid md:grid-cols-4 grid-cols-4 md:gap-4">
        <div className="mb-3 md:mb-0">
          <FuelTypePill value={<FormattedMessage id={fuelLabelId} />} />
        </div>
        <div className="md:col-span-3">
          {items.length === 1 ? (
            <Pill title={<FormattedMessage id={items[0].labelId} />}>{items[0].value}</Pill>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((m, i) => (
                <Pill key={i} title={<FormattedMessage id={m.labelId} />}>{m.value}</Pill>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const rows = [
    {
      fuelLabelId: "motorin", metrics: [
        { labelId: "minimum", value: selectedProduct.motorin_min },
        { labelId: "maximum", value: selectedProduct.motorin_max },
        { labelId: "ortalama", value: selectedProduct.motorin_ort },
      ]
    },
    { fuelLabelId: "elektrik", metrics: [{ labelId: "resistance", value: selectedProduct.elektrik_max }] },
    {
      fuelLabelId: "lpg", metrics: [
        { labelId: "minimum", value: selectedProduct.lpg_min },
        { labelId: "maximum", value: selectedProduct.lpg_max },
        { labelId: "ortalama", value: selectedProduct.lpg_ort },
      ]
    },
    {
      fuelLabelId: "dogal_gaz", metrics: [
        { labelId: "minimum", value: selectedProduct.dogal_gaz_min },
        { labelId: "maximum", value: selectedProduct.dogal_gaz_max },
        { labelId: "ortalama", value: selectedProduct.dogal_gaz_ort },
      ]
    },
  ];

  const base = 'https://api.nutsroastermachine.com';

  const api = axios.create({
    baseURL: "https://api.nutsroastermachine.com/api",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": language,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg(null);

    const payload = {
      ad_soyad: name,
      e_posta: email,
      telefon: phone,
      telefon2: phone,
      message: message,
      lang: language,
    };

    try {
      const { data, status } = await api.post("/createQuote", payload);

      if (status >= 200 && status < 300) {
        setResponseMsg({
          type: "success",
          text: data?.msg || "Mesajınız başarıyla gönderildi.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setResponseMsg({
          type: "error",
          text: data?.msg || "Bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }
    } catch (err) {
      // axios hata mesajı (sunucu döndüyse) veya ağ hatası
      const fallback =
        err?.response?.data?.msg ||
        err?.message ||
        "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.";

      setResponseMsg({ type: "error", text: fallback });
      console.error("İstek hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <Container>

        <div className="pt-30 px-4 md:px-6 lg:px-8 ">
          {/* Ana grid: mobilde 1 sütun, md ve üstünde 12 */}
          <div className="grid grid-cols-1 md:grid-cols-12 md:gap-6 lg:gap-8">
            {/* Sol kolon */}
            <div className="md:col-span-5 urun-detay-sayfasi-sol space-y-6">
              {/* Görsel slider */}
              <div className="urun_detay_image_container">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={12}
                  loop
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  style={{ width: "100%" }}
                >
                  {Images.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="urun_detay_image_item">
                        <img
                          src={`${base}${item}`}
                          alt={`Ürün görseli ${idx + 1}`}
                          className="w-full h-auto block object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Model viewer: oran koruma + tam genişlik */}
              <div className="urun_detay_model_container">
                <div style={{ height: "400px", zIndex: "1" }} className="aspect-video w-full rounded-xl">
                  <ModelViewer
                    src={`${base}${selectedProduct.model_link}`}
                    alt="3D model"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>

              {/* Video: responsive iframe */}
              <div className="urun_detay_video_container">
                <div style={{ height: "400px" }} className="aspect-video w-full rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedProduct.video_link}`}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                    title="Product video"
                  />
                </div>
              </div>
            </div>

            {/* Sağ kolon */}
            <div className="md:col-span-7 urun-detay-sayfasi-sag md:pl-4 lg:pl-6">
              <div className="urun_detay_tab">
                <h3 className="urun_detay_tab_title text-xl md:text-2xl lg:text-3xl">
                  {language === "tr" ? selectedProduct.title : selectedProduct[`title_${language}`]}
                </h3>
                <p className="urun_detay_tab_subtitle mt-2 text-sm md:text-base">
                  {language === "tr" ? selectedProduct.summary : selectedProduct[`summary_${language}`]}
                </p>
                <div className="urun_detay_tab_description mt-4 prose prose-sm md:prose-base max-w-none">
                  <RtlHtml html={language === "tr" ? selectedProduct.description : selectedProduct[`description_${language}`]} lang={language} />
                </div>
              </div>

              <h6 className="boyutlar-baslik mb-2 mt-6"><FormattedMessage id='boyutlar' /></h6>
              <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dimensions.map((dim, idx) => (
                  <ProductDimension key={idx} {...dim} />
                ))}
              </div>

              <h6 className="boyutlar-baslik mb-2 mt-6">⚡ <FormattedMessage id='electric_component' /></h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProductDimension value={"1,6"} labelId={""} measure={"kw"} />
              </div>

              <h6 className="boyutlar-baslik mb-2 mt-6"><FormattedMessage id='enerji_ozellikleri' /></h6>
              <div className="grid grid-cols-1 gap-y-4">
                {rows.map((r, idx) => (
                  <EnergyRow key={idx} {...r} />
                ))}
              </div>

              <h6 className="boyutlar-baslik mb-2 mt-6"><FormattedMessage id='urun_kapasitesi' /></h6>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="urun_detay_table w-full min-w-[420px]" cellPadding={8}>
                  <thead className="bg-gray-50">
                    <tr>
                      <td className="font-semibold"><FormattedMessage id="kapasite" /></td>
                      <td className="font-semibold"><FormattedMessage id="kg_h" /></td>
                    </tr>
                  </thead>
                  <tbody>
                    {urun_tipi.map((item, key) => (
                      <tr key={key} className="border-t">
                        <td className="border-r">{<FormattedMessage id={item} />}</td>
                        <td>{selectedProduct[`${item}_kg`]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </Container>

      {/* Benzer ürünler */}
      <Container>
        <div className="pb-10 px-4 md:px-6 lg:px-8 mt-10">
          <h6 className="benzer-urunler-baslik mb-3"><FormattedMessage id="benzerUrunler" /></h6>
          <div className="benzer-urunler-swiper">
            <Swiper
              loop
              modules={[Navigation]}
              navigation={false}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2, spaceBetween: 12 },
                480: { slidesPerView: 2, spaceBetween: 12 },
                768: { slidesPerView: 3, spaceBetween: 16 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
            >
              {products.map((item) => {
                const images = item.photo?.split(',') ?? [];
                return (
                  <SwiperSlide key={item.id}>
                    <div className="benzer-urunler-container p-4 rounded-lg border hover:shadow-sm transition">
                      <Link
                        href={getProductDetailUrl(
                          language,
                          categorySlug,
                          language === 'tr' ? item.slug : item[`slug_${language}`]
                        )}
                        onClick={() => {
                          sessionStorage.setItem('selectedProductId', item.id);
                          dispatch(setSelectedProductId(item.id));
                        }}
                        className="block"
                      >
                        <img
                          src={`${base}${images[0] ?? ''}`}
                          alt=""
                          className="w-full h-44 sm:h-52 object-cover rounded-md"
                        />
                        <h6 className="mt-3 text-sm line-clamp-2">
                          {language === "tr" ? item.summary : item[`summary_${language}`]}
                        </h6>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </Container>

      <button
        className="teklif-al-butonu"
        onClick={() => setIsPopupOpen(true)}
      >
        <FormattedMessage id="teklifAl" />
      </button>

      {isPopupOpen && (
        <>
          {/* Koyu arkaplan (overlay) */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-[1px] z-40"
            onClick={() => setIsPopupOpen(false)}
            aria-hidden="true"
          />

          {/* Popup’ı ekranın ortasına getir */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* İçeriğe tıklayınca kapanmaması için propagation durdur */}
            <div
              className="popup active relative max-w-md w-full mt-10"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="popup-title"
            >
              {/* Kapat butonu */}
              <div
                className="close-btn absolute right-3 top-3 cursor-pointer"
                onClick={() => setIsPopupOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 30 30" fill="#ffffff">
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                </svg>
              </div>

              {/* Form içerik */}
              <div className="form p-2 sm:p-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h2 id="popup-title"><FormattedMessage id="teklifAl" /></h2>
                  <div className="form-element">
                    <Input
                      id="ad_soyad"
                      placeholder={intl.formatMessage({ id: 'name' })}
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="form-element">
                    <Input
                      id="e_posta"
                      placeholder={intl.formatMessage({ id: 'email' })}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="form-element">
                    {/* <Input
                      id="telefon"
                      placeholder={intl.formatMessage({ id: 'telefon' })}
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    /> */}
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      inputStyle={{ width: '100%', borderRadius: "0.60rem", height: '2.3rem', borderColor: "#e5e7eb" }}
                      country={detectedCountry}
                    />
                  </div>

                  <div className="form-element">
                    <Input
                      id="urun_adi"
                      placeholder={intl.formatMessage({ id: 'name' })}
                      value={selectedProduct.summary}
                      onChange={() => { }}
                    />
                  </div>

                  <div className="form-element">
                    <Textarea />
                  </div>

                  <div className="form-element">
                    <button
                      type="submit"
                      id="btn-submit"
                      disabled={loading}
                      aria-busy={loading}
                      className={`inline-flex items-center justify-center w-full h-11 rounded-md text-white bg-[#f3932c] hover:bg-[#e2831a] transition
                        ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          {/* Spinner */}
                          <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          <FormattedMessage id="sending" defaultMessage="Sending..." />
                        </>
                      ) : (
                        <FormattedMessage id="submit" defaultMessage="Submit" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}


    </div>
  )
}

function ProductDetail() {
  const language = useSelector((state) => state.language.language);

  return (
      <ProductDetailContent />
  )
}

export default ProductDetail

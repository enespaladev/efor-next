"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById, setSelectedBlogId } from '@/redux/blogSlice';
import { blog_data } from './data';

import './style.css';
import localFont from 'next/font/local';
import { useParams, useRouter } from 'next/navigation';

const oswald = localFont({
  src: [
      {
          path: '../../../public/fonts/Oswald/Oswald-Regular.ttf',
          weight: '400',
          style: 'normal',
      },
      {
          path: '../../../public/fonts/Oswald/Oswald-Bold.ttf',
          weight: '700',
          style: 'normal',
      },
  ],
  display: 'swap',
})
/** --- Skeleton Bileşeni --- **/
function BlogDetailSkeleton() {
  return (
    <div className="animate-pulse" style={{ backgroundColor: "#fafafa", height: "100%" }}>
      <div className="sm:px-8 blogSection">
        <div className="mx-auto mt-16 lg:mt-16 mb-16 max-w-7xl lg:px-8">
          <div className="relative px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl lg:max-w-5xl">
              <div className="xl:relative">
                <div className="mx-auto max-w-2xl">
                  {/* Geri butonu dairesi */}
                  <div
                    className="mb-8 h-10 w-10 rounded-full bg-zinc-200 shadow-md ring-1 ring-zinc-900/5 dark:bg-zinc-700"
                    aria-hidden
                  />
                  <article>
                    <header className="flex flex-col">
                      {/* Tarih çubuğu */}
                      <div className="order-first flex items-center">
                        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <span className="ml-3 h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                      {/* Başlık satırları */}
                      <div className="mt-6 space-y-3">
                        <div className="h-8 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
                        <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                    </header>

                    {/* İçerik paragrafları */}
                    <div className="mt-8 space-y-3">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-4 rounded bg-zinc-200 dark:bg-zinc-700 ${i % 5 === 4 ? 'w-2/3' : 'w-full'}`}
                        />
                      ))}
                    </div>

                    {/* Görsel placeholder (varsa) */}
                    <div className="mt-8 h-64 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BlogDetailPageComponent({ idOrSlug }) {
  const dispatch = useDispatch();
  const params = useParams();
  const urlSlug = params?.blog; // /[lang]/blogs/[blog] -> [blog] paramı
  const router = useRouter();

  const selectedBlogId = useSelector((s) => s.blog.selectedBlogId);
  const selectedBlog = useSelector((s) => s.blog.selectedBlog);
  const isLoading = useSelector((s) => s.blog.detailLoading);
  const language = useSelector((s) => s.language.language);
  const error = useSelector((s) => s.blog.detailError);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${language}/blogs`); // history yoksa listeye dön
    }
  };

  // 1) ID varsa ID ile çek
  useEffect(() => {
    const storedId = typeof window !== "undefined" ? sessionStorage.getItem("selectedBlogId") : null;
    const idFromProp = idOrSlug && /^\d+$/.test(String(idOrSlug)) ? String(idOrSlug) : null;

    const id = storedId || idFromProp || selectedBlogId;

    if (id) {
      if (!selectedBlog || String(selectedBlog?.id) !== String(id)) {
        dispatch(fetchBlogById(id));
      }
      return;
    }

    // 2) ID yoksa slug ile çek
    if (urlSlug) {
      dispatch(fetchBlogBySlug({ slug: urlSlug, lang: language }));
    }
  }, [dispatch, idOrSlug, selectedBlogId, urlSlug, language]); // language değişirse slug karşılaştırması için yeniden bakar

  // 3) Blog yüklendiyse ID'yi sessionStorage'a yaz (navigasyon sonrası geri dönüşler için)
  useEffect(() => {
    if (selectedBlog?.id && typeof window !== "undefined") {
      sessionStorage.setItem("selectedBlogId", String(selectedBlog.id));
      dispatch(setSelectedBlogId(String(selectedBlog.id)));
    }
  }, [dispatch, selectedBlog?.id]);

  return (
    <div>
      {isLoading && <div className={oswald.className}><BlogDetailSkeleton /></div>}
      {error && !isLoading && (<p className="text-red-600">Hata: {error}</p>)}
      {selectedBlog && !isLoading && !error && (
        <div className={oswald.className} style={{ backgroundColor: "#fafafa", height: "100%" }}>
          <div className='sm:px-8 blogSection'>
            <div className='mx-auto mt-16 lg:mt-16 mb-16 max-w-7xl lg:px-8'>
              <div className='relative px-4 sm:px-8 lg:px-12'>
                <div className='mx-auto max-w-2xl lg:max-w-5xl'>
                  <div className='xl:relative'>
                    <div className='mx-auto max-w-2xl'>
                      <button
                        onClick={handleBack}
                        type="button"
                        aria-label="Bloga geri dön"
                        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0">
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"
                          className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400">
                          <path d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>
                      <article>
                        <header className="flex flex-col">
                          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                            {selectedBlog[`title_${language}`]}
                          </h1>
                          <time dateTime={selectedBlog.created_at} className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
                            <span className="ml-3">
                              {new Date(selectedBlog.created_at).toLocaleDateString('tr-TR')}
                            </span>
                          </time>
                        </header>
                        <div className="mt-8 prose dark:prose-invert">
                          <div
                            dangerouslySetInnerHTML={
                              selectedBlog[`description_${language}`]
                                ? { __html: selectedBlog[`description_${language}`] }
                                : undefined
                            }
                          />
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div>
      )}
    </div>
  );
}

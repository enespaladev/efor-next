// "use client";
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter, usePathname } from 'next/navigation';
// import { FormattedMessage } from 'react-intl';
// import "../../styles/header.css";
// import "flag-icons/css/flag-icons.min.css";
// import styles from "./LanguageSelector.module.scss";
// import { setLanguage } from '../../redux/languageSlice';
// import { changeRouteLanguage } from '../../utils/changeLanguage';
// import { useDispatch, useSelector } from 'react-redux';
// import { MyLanguages } from './data';
// import { menu_items } from './data';
// import { routesMap } from '../../lib/routes';
// import MobileMenu from '../MobilMenu/mobile-menu';

// function FlagIcon({ countryCode }) {
//   return (
//     <span className={`fi fis ${styles.fiCircle} inline-block mr-2 fi-${countryCode}`} />
//   );
// }

// export default function Header({ lang }) {
//   const dispatch = useDispatch();
//   const language = useSelector((state) => state.language.language);
//   const router = useRouter();
//   const pathname = usePathname();

//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const selectedLanguage = MyLanguages.find((item) => item.key === language);
//   const LANGUAGE_SELECTOR_ID = 'language-selector';

//   const selectedLanguageSafe = selectedLanguage || { icon: 'US', name: 'English' };

//   useEffect(() => {
//     dispatch(setLanguage(lang))
//   }, [lang]);

//   const handleLanguageChange = async (newLang) => {
//     if (newLang !== language) {
//       // Mevcut scroll pozisyonunu kaydet
//       const scrollPosition = window.scrollY;
//       sessionStorage.setItem('scrollPos', scrollPosition.toString());

//       const newPath = changeRouteLanguage(pathname, newLang);
//       dispatch(setLanguage(newLang));

//       console.log("New Path:", newPath);

//       // Scroll: false ile Next.js'in otomatik sıfırlamasını engelle
//       await router.push(newPath, { scroll: false });

//       // Dil değişikliği sonrası scroll pozisyonunu geri yükle
//       setTimeout(() => {
//         const savedPosition = sessionStorage.getItem('scrollPos');
//         if (savedPosition) {
//           window.scrollTo(0, parseInt(savedPosition, 10));
//         }
//         sessionStorage.removeItem('scrollPos');
//       }, 100); // Kısa gecikme ile render'ın tamamlanmasını bekle
//     }
//     setIsOpen(false);
//     document.documentElement.lang = newLang;
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   console.log("language:", language);

//   return (
//       <header className='header-fixed'>
//         <div className={isScrolled ? 'wrap-menu-header slide' : 'wrap-menu-header'}>
//           <div className='header_container h-full'>
//             <div className='wrap_header trans-0-3 flex items-center'>
//               <div className='logo'>
//                 <Link href="/">
//                   <img src="https://nutsroastermachine.com//storage/photos/30/logo-dark2.png" width={97} height={60} alt="Logo" />
//                 </Link>
//               </div>

//               <div className='wrap_menu p-l-0-xl flex-1'>
//                 <nav className='menu'>
//                   <ul className='main_menu'>
//                     {Object.entries(routesMap).map(([key, value]) => (
//                       <li key={key}>
//                         <Link href={value[language]}>
//                           <FormattedMessage id={key} />
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </nav>
//               </div>

//               {/* SAĞ AKSİYON GRUBU */}
//               <div className="header-actions ml-auto flex items-center gap-2 sm:gap-3">
//                 <div className='header-iletisim hidden lg:flex items-center'>
//                   <i className="fa-solid fa-address-book"></i>
//                   <Link href={routesMap.contact[language]}>İletişim</Link>
//                 </div>

//                 <div className='language-selector relative inline-block text-left mr-1 sm:mr-2'>
//                   <div>
//                     <button
//                       onClick={() => setIsOpen(!isOpen)}
//                       type="button"
//                       className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//                       id={LANGUAGE_SELECTOR_ID}
//                       aria-haspopup="true"
//                       aria-expanded={isOpen}
//                     >
//                       <FlagIcon countryCode={selectedLanguageSafe.icon} />
//                       {selectedLanguageSafe.name}
//                       <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                         <path fillRule="evenodd" d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z" clipRule="evenodd" />
//                       </svg>
//                     </button>
//                   </div>

//                   {isOpen && (
//                     <div
//                       className="origin-top-right absolute right-0 mt-2 min-w-40 rounded-md shadow-lg bg-white border border-gray-200"
//                       role="menu"
//                       aria-orientation="horizontal"
//                       aria-labelledby="language-selector"
//                     >
//                       <div className="py-1 grid grid-cols-1 gap-1" role="none">
//                         {MyLanguages.map((item, index) => (
//                           <button
//                             key={item.key}
//                             onClick={() => handleLanguageChange(item.key)}
//                             className={`${selectedLanguage.key === item.key ? "bg-gray-100 text-gray-900" : "text-gray-700"} 
//                             block px-4 py-2 text-sm text-left inline-flex items-center hover:bg-gray-100`}
//                             role="menuitem"
//                           >
//                             <FlagIcon countryCode={item.icon} />
//                             <span className="truncate">{item.name}</span>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <MobileMenu />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//   );
// }


"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import "../../styles/header.css";
import "flag-icons/css/flag-icons.min.css";
import styles from "./LanguageSelector.module.scss";
import { setLanguage } from '../../redux/languageSlice';
import { changeRouteLanguage } from '../../utils/changeLanguage';
import { useDispatch, useSelector } from 'react-redux';
import { MyLanguages } from './data';
import { menu_items } from './data';
import { routesMap } from '../../lib/routes';
import MobileMenu from '../MobilMenu/mobile-menu';

function FlagIcon({ countryCode }) {
  return (
    <span className={`fi fis ${styles.fiCircle} inline-block mr-2 fi-${countryCode}`} />
  );
}

export default function Header({ lang }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language?.language);
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false);

  const selectedLanguage = MyLanguages.find((item) => item.key === language);
  const LANGUAGE_SELECTOR_ID = 'language-selector';

  // Language henüz yüklenmediyse loading göster
  useEffect(() => {
    if (language) {
      setIsLanguageLoaded(true);
    }
  }, [language]);

  useEffect(() => {
    if (lang) {
      dispatch(setLanguage(lang));
    }
  }, [lang, dispatch]);

  const handleLanguageChange = async (newLang) => {
    if (newLang !== language) {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('scrollPos', scrollPosition.toString());

      const newPath = changeRouteLanguage(pathname, newLang);
      dispatch(setLanguage(newLang));

      await router.push(newPath, { scroll: false });

      setTimeout(() => {
        const savedPosition = sessionStorage.getItem('scrollPos');
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }
        sessionStorage.removeItem('scrollPos');
      }, 100);
    }
    setIsOpen(false);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // if (!isLanguageLoaded) {
  //   return (
  //     <header className='header-fixed'>
  //       <div className='wrap-menu-header'>
  //         <div className='header_container h-full'>
  //           <div className='wrap_header trans-0-3 flex items-center justify-center'>
  //             <div className='logo'>
  //               <Link href="/">
  //                 <img src="/logo.png" width={97} height={60} alt="Logo" />
  //               </Link>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </header>
  //   );
  // }

  const selectedLanguageSafe = selectedLanguage || MyLanguages[0] || { icon: 'US', name: 'English', key: 'en' };

  return (
    <header className='header-fixed'>
      <div className={isScrolled ? 'wrap-menu-header slide' : 'wrap-menu-header'}>
        <div className='header_container h-full'>
          <div className='wrap_header trans-0-3 flex items-center'>
            <div className='logo'>
              <Link href="/">
                <img src="/img/logo.png" width={97} height={60} alt="Logo" />
              </Link>
            </div>
            <div className='wrap_menu p-l-0-xl flex-1'>
              <nav className='menu'>
                <ul className='main_menu'>
                  {Object.entries(routesMap).map(([key, value]) => {
                    const href = value[language] || value['tr'] || '/';
                    return (
                      <li key={key}>
                        <Link href={href}>
                          <FormattedMessage id={key} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* SAĞ AKSİYON GRUBU */}
            <div className="header-actions ml-auto flex items-center gap-2 sm:gap-3">
              <div className='header-iletisim hidden lg:flex items-center'>
                <i className="fa-solid fa-address-book"></i>
                <Link href={routesMap.contact[language] || '/contact'}>İletişim</Link>
              </div>

              <div className='language-selector relative inline-block text-left mr-1 sm:mr-2'>
                <div>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    id={LANGUAGE_SELECTOR_ID}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    <FlagIcon countryCode={selectedLanguageSafe.icon} />
                    {selectedLanguageSafe.name}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10.293 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 min-w-40 rounded-md shadow-lg bg-white border border-gray-200"
                    role="menu"
                    aria-orientation="horizontal"
                    aria-labelledby="language-selector"
                  >
                    <div className="py-1 grid grid-cols-1 gap-1" role="none">
                      {MyLanguages.map((item) => (
                        <button
                          key={item.key}
                          onClick={() => handleLanguageChange(item.key)}
                          className={`${selectedLanguageSafe.key === item.key ? "bg-gray-100 text-gray-900" : "text-gray-700"} 
                            block px-4 py-2 text-sm text-left inline-flex items-center hover:bg-gray-100`}
                          role="menuitem"
                        >
                          <FlagIcon countryCode={item.icon} />
                          <span className="truncate">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
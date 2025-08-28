"use client"

import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Home, Info, Settings, Mail } from "lucide-react"
import Link from "next/link"

import './style.css';
import { routesMap } from "@/lib/routes"
import { useSelector } from "react-redux"
import { FormattedMessage } from "react-intl"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const anchorRef = useRef(null) // <-- TS tipi kaldırıldı
  const [portalPos, setPortalPos] = useState({ top: 0, left: 0, width: 0, height: 0 }) // <-- TS tipi kaldırıldı
  const language = useSelector((state) => state.language.language);

  useEffect(() => setMounted(true), [])

  const toggleMenu = () => setIsOpen(v => !v)

  // Body scroll kilidi
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  // Header butonunun konumunu ölç ve portal butonunu aynı yere yerleştir
  const measure = () => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPortalPos({
      top: rect.top,
      // top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height
    })
  }

  useLayoutEffect(() => {
    if (!isOpen) return
    // İlk ölçüm
    measure()
    // Resize’da yeniden ölç
    const onResize = () => {
      // rAF ile bir frame sonra ölç (layout stabil olsun)
      requestAnimationFrame(measure)
    }
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [isOpen])

  const menuItems = [
    { label: "Ana Sayfa", href: "/", icon: Home },
    { label: "Hakkımızda", href: "/about", icon: Info },
    { label: "Hizmetler", href: "/services", icon: Settings },
    { label: "İletişim", href: "/contact", icon: Mail },
  ]

  // Overlay + Drawer (PORTAL)
  const drawer = (
    <div
      className={`fixed inset-0 z-[1200] md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay sadece opacity ile animasyon */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"
          }`}
        onClick={toggleMenu}
      />

      {/* Drawer sadece translate ile animasyon */}
      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
        className={`absolute inset-y-0 right-0 w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl
                    transform transition-transform duration-500
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                    overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]`}
        style={{ willChange: "transform", contain: "layout paint size", zIndex: 1300 }}
      >
        <div className=" top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 p-6 relative flex items-center justify-between">
          <Link href="/">
            <img
              src="https://nutsroastermachine.com//storage/photos/30/logo-dark2.png"
              width={75}
              height={45}
              alt="Logo"
            />
          </Link>
          {/* Ekstra X butonu istemediğin için eklemedim */}
        </div>

        <div className="flex flex-col p-4 space-y-1">
          {Object.entries(routesMap).map(([key, value]) => (
            <Link
              key={key}
              href={value[language]}
              onClick={toggleMenu}
              className="mobil-menu-item"
              style={{
                animationDelay: isOpen ? `${value * 120}ms` : "0ms",
                animationDuration: "600ms",
                animationFillMode: "both",
              }}
            >
              <span className="transition-all duration-300"><FormattedMessage id={key} /></span>
            </Link>
          ))}

          {/* {menuItems.map((item, index) => {
            // const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="mobil-menu-item"
                style={{
                  animationDelay: isOpen ? `${index * 120}ms` : "0ms",
                  animationDuration: "600ms",
                  animationFillMode: "both",
                }}
              >
                <span className="transition-all duration-300">{item.label}</span>
              </Link>
            )
          })} */}
        </div>
        {/* 
        <div className="px-6 pb-6 mt-auto">
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400 dark:text-gray-500">Mobil Menü</span>
          </div>
        </div> */}
      </aside>
    </div>
  )

  // PORTALDAKİ HAMBURGER→X (aynı markup), overlay/drawer'ın ÜSTÜNDE
  const portalToggle = (
    <div
      className="fixed z-[1400] md:hidden"
      style={{
        top: portalPos.top,
        left: portalPos.left,
        width: portalPos.width || undefined,
        height: portalPos.height || undefined
      }}
    >
      <Button
        aria-label="Mobil menüyü kapat"
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-out"
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "rotate-45 translate-y-2" : ""
              }`}
          />
          <span
            className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
          />
        </div>
      </Button>
    </div>
  )

  return (
    <>
      {/* Header içindeki orijinal toggle */}
      <div ref={anchorRef} className={`md:hidden relative ${isOpen ? "invisible" : "visible"} z-[1]`}>
        <Button
          aria-label="Mobil menüyü aç"
          aria-expanded={isOpen}
          aria-controls="mobile-drawer"
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="group hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 ease-out"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-700 ease-out ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </Button>
      </div>

      {/* Drawer/Overlay portalı */}
      {mounted && createPortal(drawer, document.body)}

      {/* Menü AÇIKKEN: aynı toggle’ı portal ile body’ye yerleştir (overlay/drawer üstünde) */}
      {mounted && isOpen && createPortal(portalToggle, document.body)}
    </>
  )
}

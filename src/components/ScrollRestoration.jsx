"use client";

import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollPos", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const saved = sessionStorage.getItem("scrollPos");
    if (saved !== null) {
      window.scrollTo(0, parseInt(saved, 10));
      sessionStorage.removeItem("scrollPos");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // route hook yok, Suspense gereksinimi kalkar

  return null;
}

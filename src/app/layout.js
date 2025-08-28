// src/app/layout.js
import './globals.css'; // (varsa global stilini burada yükle)
import Script from 'next/script';

export const metadata = {
  title: { default: 'Efor Kuruyemiş Makinaları', },
  description: 'Production build',
  icons: { icon: '/favicon.png', }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tailwindcss@4.1.11/dist/tailwind.min.css"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

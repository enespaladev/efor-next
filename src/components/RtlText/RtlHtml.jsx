'use client';

import DOMPurify from 'isomorphic-dompurify';
import parse, { domToReact } from 'html-react-parser';

export default function RtlHtml({ html, lang = 'ar' }) {
  if (!html) return null;

  const isRtl = String(lang).toLowerCase() === 'ar';

  // 1) Word/MSO çöplerini süpür
  let pre = html
    .replace(/\sclass="Mso[^"]*"/gi, '')
    .replace(/\sstyle="[^"]*mso-[^"]*"/gi, '')
    .replace(/<o:p>\s*<\/o:p>/gi, '')
    .replace(/<o:p>.*?<\/o:p>/gi, '')
    .replace(/\s+tab-stops:[^;"]*;?/gi, '');

  // 2) XSS'e karşı sanitize
  const clean = DOMPurify.sanitize(pre, {
    ALLOWED_TAGS: ['p','span','b','strong','i','em','u','br','ul','ol','li','bdi'],
    ALLOWED_ATTR: ['dir','lang'],
  });

  // 3) <span dir="LTR">...</span> -> <bdi dir="ltr">...</bdi>
  const jsx = parse(clean, {
    replace: (node) => {
      if (node.type === 'tag') {
        const { name, attribs, children } = node;

        if (name === 'span' && attribs?.dir?.toLowerCase() === 'ltr') {
          return <bdi dir="ltr">{domToReact(children)}</bdi>;
        }

        if (name === 'span' && !attribs?.dir) {
          return <>{domToReact(children)}</>;
        }
      }
      return undefined;
    },
  });

  // 4) Konteyner hizası ve yönü
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      lang={lang}
      style={{
        textAlign: isRtl ? 'right' : 'left',
        unicodeBidi: isRtl ? 'isolate' : 'normal',
      }}
      suppressHydrationWarning
    >
      {jsx}
    </div>
  );
}

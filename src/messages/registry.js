import AboutMessages   from '@/components/About/data';
import AfterSellingMessages from '@/components/AfterSelling/data';
import BlogPageMessages  from '@/components/BlogPage/data';
import CertificatesMessages from '@/components/Certificates/data';
import ContactFormMessages from '@/components/ContactForm/data';
import ContactItemMessages from '@/components/ContactItem/data';
import FooterMessages from '@/components/footer/data'
import HeaderMessages from '@/components/header/data';
import LinesMessages from '@/components/Lines/data';
import ProductsMessages from '@/components/Products/data';
import ProductSliderMessages from '@/components/ProductSlider/data';

const modules = [
  AboutMessages,
  AfterSellingMessages,
  BlogPageMessages,
  CertificatesMessages,
  ContactFormMessages,
  ContactItemMessages,
  FooterMessages,
  HeaderMessages,
  LinesMessages,
  ProductsMessages,
  ProductSliderMessages
  // ... diğer komponent mesaj modülleri
]

export function getMessages(lang = 'tr') {
  return modules.reduce((acc, mod) => {
    Object.assign(acc, mod?.[lang] ?? {})
    return acc
  }, {})
}

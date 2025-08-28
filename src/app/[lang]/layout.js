import ReduxProvider from '@/redux/ReduxProvider'
import IntlClientProvider from '../intl-provider'
import { getMessages } from '@/messages/registry'
import Header from '@/components/header'
import Footer from '@/components/footer'
// import Footer from '@/components/footer/testFooter';
import LanguageInitializer from '@/components/LanguageInitiliazer'


export default async function LangLayout({ children, params }) {
  const { lang } = await params
  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const messages = getMessages(lang)

  return (
    <div className='flex flex-col min-h-screen'>
      <ReduxProvider>
        <IntlClientProvider locale={lang} messages={messages}>
          <LanguageInitializer lang={lang}>
            <Header />
            <main style={{ flex: 1 }}> {/* ← Bu önemli */}
              {children}
            </main>
            <Footer />
          </LanguageInitializer>
        </IntlClientProvider>
      </ReduxProvider>
    </div>
  )
}


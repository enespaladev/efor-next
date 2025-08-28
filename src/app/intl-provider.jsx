'use client'

import { IntlProvider } from 'react-intl'

export default function IntlClientProvider({ locale, messages, children }) {
  return (
    <IntlProvider locale={locale} messages={messages} onError={() => {}}>
      {children}
    </IntlProvider>
  )
}

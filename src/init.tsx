import React from 'react'
import i18next from 'i18next'
import ReactPostprocessor from 'i18next-react-postprocessor'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { store } from './store'
import { AuthProvider } from './auth'
import { ApiContext, createApi } from './api'
import { LegalContext, buildLegal } from './legal'
import { PaymentContext } from './payment'
import { getClientLocale, buildResources, fallbackLng } from './locales'
import App from './components/App'

const init = async () => {
  const api = createApi()
  const lng = getClientLocale()
  const [elementsResponse, configResponse] = await Promise.all([
    api.getElements({ locale: lng }),
    api.getAppConfig({ bundleId: 'auraweb' }),
  ])
  const resources = buildResources(elementsResponse)
  const legal = buildLegal(elementsResponse)
  const config = configResponse.data
  const i18nextInstance = i18next.createInstance()
  const options = { lng, resources, fallbackLng, postProcess: [ `reactPostprocessor` ] }
  await i18nextInstance.use(initReactI18next).use(new ReactPostprocessor()).init(options)
  window.Chargebee.init(config.chargebee)
  return (
    <React.StrictMode>
      <I18nextProvider i18n={i18nextInstance}>
        <Provider store={store}>
          <BrowserRouter>
            <ApiContext.Provider value={api}>
              <AuthProvider>
                <LegalContext.Provider value={legal}>
                  <PaymentContext.Provider value={window.Chargebee.getInstance()}>
                    <App />
                  </PaymentContext.Provider>
                </LegalContext.Provider>
              </AuthProvider>
            </ApiContext.Provider>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  )
}

export default init

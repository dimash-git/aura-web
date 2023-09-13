import type { UserStatus } from "./types"

const host = ''
const apiHost = 'https://aura.wit.life'
const prefix = 'api/v1'

const routes = {
  client: {
    root: () => [host, ''].join('/'),
    birthday: () => [host, 'birthday'].join('/'),
    didYouKnow: () => [host, 'did-you-know'].join('/'),
    freePeriodInfo: () => [host, 'free-period'].join('/'),
    birthtime: () => [host, 'birthtime'].join('/'),
    emailEnter: () => [host, 'email'].join('/'),
    subscription: () => [host, 'subscription'].join('/'),
    createProfile: () => [host, 'profile', 'create'].join('/'),
    attention: () => [host, 'attention'].join('/'),
    feedback: () => [host, 'feedback'].join('/'),
    paymentMethod: () => [host, 'payment', 'method'].join('/'),
    wallpaper: () => [host, 'wallpaper'].join('/'),
    static: () => [host, 'static', ':typeId'].join('/'),
    legal: (type: string) => [host, 'static', type].join('/'),
    compatibility: () => [host, 'compatibility'].join('/'),
    compatibilityResult: () => [host, 'compatibility', 'result'].join('/'),
    breath: () => [host, 'breath'].join('/'),
    priceList: () => [host, 'price-list'].join('/'),
    home: () => [host, 'home'].join('/'),
    breathResult: () => [host, 'breath', 'result'].join('/'),
  },
  server: {
    user: () => [apiHost, prefix, 'user.json'].join('/'),
    token: () => [apiHost, prefix, 'auth', 'token.json'].join('/'),
    elements: () => [apiHost, prefix, 'elements.json'].join('/'),
    element: (type: string) => [apiHost, prefix, 'elements', `${type}.json`].join('/'),
    apps: (bundleId: string) => [apiHost, prefix, 'apps', `${bundleId}.json`].join('/'),
    assets: (category: string) => [apiHost, prefix, 'assets', 'categories', `${category}.json`].join('/'),
    assetCategories: () => [apiHost, prefix, 'assets', 'categories.json'].join('/'),
    dailyForecasts: () => [apiHost, prefix, 'user', 'daily_forecast.json'].join('/'),
    auras: () => [apiHost, prefix, 'user', 'aura.json'].join('/'),
    paymentIntents: () => [apiHost, prefix, 'user', 'payment_intents.json'].join('/'),
    subscriptionItems: () => [apiHost, prefix, 'user', 'subscription', 'item_prices.json'].join('/'),
    subscriptionCheckout: () => [apiHost, prefix, 'user', 'subscription', 'checkout', 'new.json'].join('/'),
    subscriptionStatus: () => [apiHost, prefix, 'user', 'subscription_receipts', 'status.json'].join('/'),
    subscriptionReceipts: () => [apiHost, prefix, 'user', 'subscription_receipts.json'].join('/'),
    subscriptionReceipt: (id: string) => [apiHost, prefix, 'user', 'subscription_receipts', `${id}.json`].join('/'),
    compatCategories: () => [apiHost, prefix, 'ai', 'compat_categories.json'].join('/'),
    compat: () => [apiHost, prefix, 'ai', 'compats.json'].join('/'),
    createUserCallbacks: () => [apiHost, prefix, 'user', 'callbacks.json'].join('/'),
    getUserCallbacks: (id: string) => [apiHost, prefix, 'user', 'callbacks', `${id}.json`].join('/'),
  },
}

export const entrypoints = [
  routes.client.root(),
  routes.client.birthday(),
  routes.client.subscription(),
  routes.client.wallpaper(),
  routes.client.didYouKnow(),
  routes.client.attention(),
  routes.client.feedback(),
  routes.client.breath(),
  routes.client.compatibilityResult(),
  routes.client.home(),
  routes.client.breathResult(),
]
export const isEntrypoint = (path: string) => entrypoints.includes(path)
export const isNotEntrypoint = (path: string) => !isEntrypoint(path)
export const withNavigationRoutes = [routes.client.wallpaper()]
export const hasNavigation = (path: string) => withNavigationRoutes.includes(path)
export const hasNoNavigation = (path: string) => !hasNavigation(path)

export const withCrossButtonRoutes = [routes.client.attention()]
export const hasCrossButton = (path: string) => withCrossButtonRoutes.includes(path)

export const withoutFooterRoutes = [
  routes.client.didYouKnow(),
  routes.client.freePeriodInfo(),
  routes.client.createProfile(),
  routes.client.attention(),
  routes.client.feedback(),
  routes.client.compatibility(),
  routes.client.breath(),
  routes.client.priceList(),
  routes.client.compatibilityResult(),
  routes.client.home(),
  routes.client.breathResult(),
]
export const hasNoFooter = (path: string) => !withoutFooterRoutes.includes(path)

export const withoutHeaderRoutes = [
  routes.client.compatibility(),
]
export const hasNoHeader = (path: string) => !withoutHeaderRoutes.includes(path)

export const getRouteBy = (status: UserStatus): string => {
  switch (status) {
    case 'lead':
      return routes.client.birthday()
    case 'registred':
    case 'unsubscribed':
      return routes.client.subscription()
    case 'subscribed':
      return routes.client.wallpaper()
    default:
      throw new Error(`Unknown user status, received status is "${status}"`)
  }
}

export default routes

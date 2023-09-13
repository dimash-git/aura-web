import { createMethod } from './utils'
import {
  User,
  Auras,
  Element,
  Elements,
  AuthTokens,
  Apps,
  Assets,
  AssetCategories,
  DailyForecasts,
  SubscriptionItems,
  SubscriptionCheckout,
  SubscriptionReceipts,
  SubscriptionStatus,
  PaymentIntents,
  AICompatCategories,
  AICompats,
  AIRequests,
  UserCallbacks
} from './resources'

const api = {
  auth: createMethod<AuthTokens.Payload, AuthTokens.Response>(AuthTokens.createRequest),
  getAppConfig: createMethod<Apps.Payload, Apps.Response>(Apps.createRequest),
  getElement: createMethod<Element.Payload, Element.Response>(Element.createRequest),
  getElements: createMethod<Elements.Payload, Elements.Response>(Elements.createRequest),
  getUser: createMethod<User.GetPayload, User.Response>(User.createGetRequest),
  updateUser: createMethod<User.PatchPayload, User.Response>(User.createPatchRequest),
  getAssets: createMethod<Assets.Payload, Assets.Response>(Assets.createRequest),
  getAssetCategories: createMethod<AssetCategories.Payload, AssetCategories.Response>(AssetCategories.createRequest),
  getDailyForecasts: createMethod<DailyForecasts.Payload, DailyForecasts.Response>(DailyForecasts.createRequest),
  getAuras: createMethod<Auras.Payload, Auras.Response>(Auras.createRequest),
  getSubscriptionItems: createMethod<SubscriptionItems.Payload, SubscriptionItems.Response>(SubscriptionItems.createRequest),
  getSubscriptionCheckout: createMethod<SubscriptionCheckout.Payload, SubscriptionCheckout.Response>(SubscriptionCheckout.createRequest),
  getSubscriptionStatus: createMethod<SubscriptionStatus.Payload, SubscriptionStatus.Response>(SubscriptionStatus.createRequest),
  getSubscriptionReceipt: createMethod<SubscriptionReceipts.GetPayload, SubscriptionReceipts.Response>(SubscriptionReceipts.createGetRequest),
  createSubscriptionReceipt: createMethod<SubscriptionReceipts.Payload, SubscriptionReceipts.Response>(SubscriptionReceipts.createRequest),
  createPaymentIntent: createMethod<PaymentIntents.Payload, PaymentIntents.Response>(PaymentIntents.createRequest),
  getAiCompatCategories: createMethod<AICompatCategories.Payload, AICompatCategories.Response>(AICompatCategories.createRequest),
  getAiCompat: createMethod<AICompats.Payload, AICompats.Response>(AICompats.createRequest),
  getAiRequest: createMethod<AIRequests.Payload, AIRequests.Response>(AIRequests.createRequest),
  createUserCallbacks: createMethod<UserCallbacks.PayloadPost, UserCallbacks.Response>(UserCallbacks.createRequestPost),
  getUserCallbacks: createMethod<UserCallbacks.PayloadGet, UserCallbacks.Response>(UserCallbacks.createRequestGet),
}

export type ApiContextValue = typeof api

export function createApi(): ApiContextValue {
  return api
}

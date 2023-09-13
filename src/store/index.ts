import { combineReducers, configureStore, createAction } from '@reduxjs/toolkit'
import token, { actions as tokenActions, selectToken } from './token'
import user, { actions as userActions, selectUser } from './user'
import form, { actions as formActions, selectors as formSelectors } from './form'
import aura, { actions as auraActions } from './aura'
import payment, { actions as paymentActions } from './payment'
import subscriptionPlans, { actions as subscriptionPlasActions, selectPlanById } from './subscriptionPlan'
import status, { actions as userStatusActions, selectStatus } from './status'
import compatibility, { actions as compatibilityActions } from './compatibility'
import { loadStore, backupStore } from './storageHelper'
import { selectAuraCoordinates } from './aura'
import { selectSelectedPrice } from './payment'
import { selectRightUser, selectCategoryId } from './compatibility'

const preloadedState = loadStore()
export const reducer = combineReducers({ token, user, form, status, subscriptionPlans, aura, payment, compatibility })
export const actions = {
  token: tokenActions,
  user: userActions,
  form: formActions,
  status: userStatusActions,
  subscriptionPlan: subscriptionPlasActions,
  aura: auraActions,
  compatibility: compatibilityActions,
  payment: paymentActions,
  reset: createAction('reset'),
}
export const selectors = {
  selectToken,
  selectUser,
  selectStatus,
  selectPlanById,
  selectAuraCoordinates,
  selectRightUser,
  selectCategoryId,
  selectSelectedPrice,
  ...formSelectors,
}
export type RootState = ReturnType<typeof reducer>
export const store = configureStore({
  reducer,
  preloadedState,
  devTools: import.meta.env.DEV,
})
export type AppDispatch = typeof store.dispatch
export type StoreType = typeof store
export const unsubscribe = backupStore(store)

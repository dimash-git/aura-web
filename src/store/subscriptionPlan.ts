import {
  createSlice, createEntityAdapter, createSelector, EntityState
} from '@reduxjs/toolkit'
import { SubscriptionItems } from '../api'

type SubscriptionPlan = SubscriptionItems.ItemPrice

const subscriptionPlanAdapter = createEntityAdapter<SubscriptionPlan>({
  selectId: (plan) => plan.id,
  sortComparer: (a, b) => a.created_at - b.created_at,
})

const initialState = subscriptionPlanAdapter.getInitialState()

const subscriptionPlanSlice = createSlice({
  name: 'subscriptionPlans',
  initialState,
  reducers: {
    setAll: subscriptionPlanAdapter.setAll,
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState)
})

export const { actions } = subscriptionPlanSlice
const { selectById } = subscriptionPlanAdapter.getSelectors()
export const selectPlanById = (id: string) => createSelector(
  (state: { subscriptionPlans: EntityState<SubscriptionPlan> }) => state.subscriptionPlans,
  (state) => selectById(state, id)
)
export default subscriptionPlanSlice.reducer

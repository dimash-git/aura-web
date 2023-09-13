import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IPayment {
    selectedPrice: number | null
}

const initialState: IPayment = {
  selectedPrice: null
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IPayment>>) {
        return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState),
})

export const { actions } = paymentSlice
export const selectSelectedPrice = createSelector(
  (state: { payment: IPayment }) => state.payment.selectedPrice,
  (payment) => payment
)
export default paymentSlice.reducer

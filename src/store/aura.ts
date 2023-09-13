import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IAura {
    coordinates: {
        X: number
        Y: number
    }
}

const initialState: IAura = {
  coordinates: {
    X: 0,
    Y: 0
  }
}

const auraSlice = createSlice({
  name: 'aura',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<IAura>>) {
        if (action.payload.coordinates?.X) {
            return { ...state, ...action.payload }
        } else {
            return state
        }
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState),
})

export const { actions } = auraSlice
export const selectAuraCoordinates = createSelector(
  (state: { aura: IAura }) => state.aura.coordinates,
  (aura) => aura
)
export default auraSlice.reducer

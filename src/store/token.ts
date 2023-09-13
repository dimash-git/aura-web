import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AuthToken } from '../api'

const initialState: AuthToken = ''

const authTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    update(state, action: PayloadAction<AuthToken>) {
      state = action.payload
      return state
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState)
})

export const { actions } = authTokenSlice
export const selectToken = createSelector(
  (state: { token: AuthToken }) => state.token,
  (token) => token
)
export default authTokenSlice.reducer

import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UserStatus } from '../types'

const initialState = 'lead' as UserStatus

const userStatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    update(state, action: PayloadAction<UserStatus>) {
      state = action.payload
      return state
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState)
})

export const { actions } = userStatusSlice
export const selectStatus = createSelector(
  (state: { status: UserStatus }) => state.status,
  (status) => status
)
export default userStatusSlice.reducer

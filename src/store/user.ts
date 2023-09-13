import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api'
import { getClientLocale, getClientTimezone } from '../locales'

const initialState: User.User = {
  id: undefined,
  username: null,
  email: '',
  locale: getClientLocale(),
  state: '',
  timezone: getClientTimezone(),
  new_registration: false,
  stat: {
    last_online_at: null,
    prev_online_at: null
  },
  profile: {
    full_name: null,
    gender: null,
    birthday: null,
    birthplace: null,
    age: null,
    sign: null,
    userpic: null,
    userpic_mime_type: undefined,
    relationship_status: '',
    human_relationship_status: ''
  },
  daily_push_subs: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<User.User>>) { 
      return { ...state, ...action.payload }
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState),
})

export const { actions } = userSlice
export const selectUser = createSelector(
  (state: { user: User.User }) => state.user,
  (user) => user
)
export default userSlice.reducer

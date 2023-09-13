import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SignupForm } from '../types'

const initialState: SignupForm = {
  birthdate: '',
  birthtime: '12:00',
  email: '',
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addDate(state, action: PayloadAction<string>) {
      state.birthdate = action.payload
      return state
    },
    addTime(state, action: PayloadAction<string>) {
      state.birthtime = action.payload
      return state
    },
    addEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
      return state
    },
  },
  extraReducers: (builder) => builder.addCase('reset', () => initialState),
})

export const { actions } = formSlice
const selectForm = createSelector(
  (state: { form: SignupForm }) => state.form,
  (form) => form
)
const selectEmail = createSelector(
  (state: { form: SignupForm }) => state.form.email,
  (email) => email
)
const selectBirthdate = createSelector(
  (state: { form: SignupForm }) => state.form.birthdate,
  (birthdate) => birthdate
)
const selectBirthtime = createSelector(
  (state: { form: SignupForm }) => state.form.birthtime,
  (birthtime) => birthtime
)
const selectBirthday = createSelector(
  selectBirthdate,
  selectBirthtime,
  (birthdate, birthtime) => `${birthdate} ${birthtime}`
)
export const selectors = {
  selectForm,
  selectEmail,
  selectBirthdate,
  selectBirthtime,
  selectBirthday,
}
export default formSlice.reducer

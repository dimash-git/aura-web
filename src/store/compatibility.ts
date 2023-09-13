import { IDate } from "@/services/date";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICompatibility {
  rightUser: IUser;
  categoryId: number;
}

interface IUser {
  name: string;
  birthDate: string | IDate;
}

const initialState: ICompatibility = {
  rightUser: {
    name: "",
    birthDate: "",
  },
  categoryId: 1,
};

const compatibilitySlice = createSlice({
  name: "compatibility",
  initialState,
  reducers: {
    update(state, action: PayloadAction<Partial<ICompatibility>>) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => builder.addCase("reset", () => initialState),
});

export const { actions } = compatibilitySlice;
export const selectRightUser = createSelector(
  (state: { compatibility: ICompatibility }) => state.compatibility.rightUser,
  (compatibility) => compatibility
);
export const selectCategoryId = createSelector(
  (state: { compatibility: ICompatibility }) => state.compatibility.categoryId,
  (compatibility) => compatibility
);
export default compatibilitySlice.reducer;

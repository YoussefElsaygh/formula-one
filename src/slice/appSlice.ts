import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  listViewType: "list" | "card";
}

const initialState: AppState = {
  listViewType: "list",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setListViewType: (state, action: PayloadAction<"list" | "card">) => {
      state.listViewType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setListViewType } = appSlice.actions;

export default appSlice.reducer;

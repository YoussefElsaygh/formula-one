import { createSlice } from "@reduxjs/toolkit";
import { Race } from "../types/Race";

export interface RacesState {
  favoriteRaces: Race[];
}

const initialState: RacesState = {
  favoriteRaces: [],
};

export const racesSlice = createSlice({
  name: "races",
  initialState,
  reducers: {
    addFavoriteRace: (state, action) => {
      state.favoriteRaces.push(action.payload);
    },
    removeFavoriteRace: (state, action) => {
      state.favoriteRaces = state.favoriteRaces.filter(
        (r) => r !== action.payload
      );
    },
  },
});

export const { addFavoriteRace, removeFavoriteRace } = racesSlice.actions;

export default racesSlice.reducer;

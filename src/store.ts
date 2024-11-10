import { configureStore } from "@reduxjs/toolkit";
import racesReducer from "./slice/racesSlice";
import appReducer from "./slice/appSlice";
import { ergastApi } from "./api/ergastApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const appPersistConfig = {
  key: "app",
  storage,
};
const racesPersistConfig = {
  key: "races",
  storage,
};

const appPersistedReducer = persistReducer(appPersistConfig, appReducer);
const racesPersistedReducer = persistReducer(racesPersistConfig, racesReducer);

//
export const store = configureStore({
  reducer: {
    races: racesPersistedReducer,
    app: appPersistedReducer,
    [ergastApi.reducerPath]: ergastApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ergastApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

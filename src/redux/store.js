import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import trucksSlicer from "./trucks/slice.js";
import filtersSlicer from "./filters/slice.js";
import isFavoriteSlicer from "./isFavorite/slice.js";

const rootReducer = combineReducers({
  trucks: trucksSlicer,
  filters: filtersSlicer,
  isFavorite: isFavoriteSlicer,
});

const trucksPersistConfig = {
  key: "root",
  storage,
  whitelist: ["trucks", "isFavorite"],
};

const persistedReducer = persistReducer(trucksPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export const persistor = persistStore(store);

export default store;

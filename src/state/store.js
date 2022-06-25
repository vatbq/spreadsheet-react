import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;

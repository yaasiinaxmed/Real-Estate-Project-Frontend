import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./api/AuthSlice";
import { userSlice } from "./api/UserSlice";
import { propertySlice } from "./api/PropertySlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [propertySlice.reducerPath]: propertySlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authSlice.middleware)
      .concat(userSlice.middleware)
      .concat(propertySlice.middleware),
});

setupListeners(store.dispatch);

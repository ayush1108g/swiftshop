import { configureStore } from "@reduxjs/toolkit";

import themeModeReducer from "./ThemeMode.ts";

const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

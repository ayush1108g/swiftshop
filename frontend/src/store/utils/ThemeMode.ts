import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lightColors, darkColors } from "./Colors.ts";

interface ThemeModeState {
  mode: "light" | "dark";
  color: Record<string, string>;
}

const defaultState: ThemeModeState = {
  mode: localStorage.getItem("mode") as "light" | "dark" || "dark",
  color: localStorage.getItem("mode") === "light" ? lightColors : darkColors,
};

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: defaultState,
  reducers: {
    setThemeMode(state, action: PayloadAction<"light" | "dark">) {
      state.mode = action.payload;
      state.color = action.payload === "light" ? lightColors : darkColors;
      localStorage.setItem("mode", action.payload);
    },
  },
});

export const setThemeMode = themeModeSlice.actions;
export default themeModeSlice.reducer;

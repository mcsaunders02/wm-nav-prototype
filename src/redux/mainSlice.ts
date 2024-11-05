import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Possible screens for the app
export enum AppScreen {
    Map,
    SelectDestination,
    HandleBlockage,
    ReportBlockage
}

export type AppState = {
    screen: AppScreen;
}

const initialState: AppState = {
    screen: AppScreen.Map
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setScreen(state: AppState, action: PayloadAction<AppScreen>) {
            state.screen = action.payload;
        }
    }
});

export const { setScreen } = mainSlice.actions;

export default mainSlice.reducer;

// Select the current screen
export const selectScreen = (state: AppState): AppScreen => state.screen;
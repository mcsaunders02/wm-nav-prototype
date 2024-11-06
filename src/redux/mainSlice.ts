import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Possible screens for the app
export enum AppScreen {
    Map,
    SelectDestination,
    HandleBlockage,
    ReportBlockage
}

export type AppState = {
    screen: AppScreen; // Current screen
    activeRoute: boolean; // Is there an active route?
};

const initialState: AppState = {
    screen: AppScreen.Map,
    activeRoute: true
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setScreen(state: AppState, action: PayloadAction<AppScreen>) {
            state.screen = action.payload;
        },

        setActiveRoute(state: AppState, action: PayloadAction<boolean>) {
            state.activeRoute = action.payload;
        }
    }
});

export const { setActiveRoute, setScreen } = mainSlice.actions;

export default mainSlice.reducer;

// Select the current screen
export const selectScreen = (state: AppState): AppScreen => state.screen;

// Selects if there is an active route
export const selectActiveRoute = (state: AppState): boolean => state.activeRoute;

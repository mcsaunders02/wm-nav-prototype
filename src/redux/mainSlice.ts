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
    isReporting: boolean; // Is the user reporting a path?
    positions: number[][]; // List of points of blockages
};

const initialState: AppState = {
    screen: AppScreen.Map,
    activeRoute: true,
    isReporting: false,
    positions: []
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
        },

        setIsReporting(state: AppState, action: PayloadAction<boolean>) {
            state.isReporting = action.payload;
        },

        addPosition(state: AppState, action: PayloadAction<number[]>) {
            state.positions.push(action.payload);
        },

        popPosition(state: AppState) {
            state.positions.pop();
        }
    }
});

export const { addPosition, popPosition, setActiveRoute, setIsReporting, setScreen } = mainSlice.actions;

export default mainSlice.reducer;

// Select the current screen
export const selectScreen = (state: AppState): AppScreen => state.screen;

// Selects if there is an active route
export const selectActiveRoute = (state: AppState): boolean => state.activeRoute;

// Selects if the user is reporting a location
export const selectIsReporting = (state: AppState): boolean => state.isReporting;

// Selects the list of positions
export const selectPositions = (state: AppState): number[][] => state.positions;
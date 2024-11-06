import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Possible screens for the app
export enum AppScreen {
    Map,
    SelectDestination,
    HandleBlockage,
    ReportBlockage
}

export type Position = {
    x: number;
    y: number;
    reason: string;
    id: string;
};

export type AppState = {
    screen: AppScreen; // Current screen
    activeRoute: boolean; // Is there an active route?
    isReporting: boolean; // Is the user reporting a path?
    positions: Position[]; // List of points of blockages
    activePos: Position | null; // Active position
};

const initialState: AppState = {
    screen: AppScreen.Map,
    activeRoute: true,
    isReporting: false,
    positions: [],
    activePos: null
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

        addPosition(state: AppState, action: PayloadAction<Position>) {
            state.positions.push(action.payload);
        },

        popPosition(state: AppState) {
            state.positions.pop();
        },

        setActivePos(state: AppState, action: PayloadAction<Position>) {
            state.activePos = action.payload;
        },

        removeActivePos(state: AppState) {
            if (state.activePos !== null) {
                state.positions = state.positions.filter(
                    (pos) => pos.id !== state.activePos!.id
                );
            }
        },

        // Updates the reason for the active pos
        updateActivePosReason(state: AppState, action: PayloadAction<string>) {
            if (state.activePos !== null) {
                state.positions = state.positions.map((pos) =>
                    pos.id === state.activePos!.id
                        ? { ...pos, reason: action.payload }
                        : pos
                );
            }
        }
    }
});

export const {
    addPosition,
    popPosition,
    removeActivePos,
    setActivePos,
    setActiveRoute,
    setIsReporting,
    setScreen,
    updateActivePosReason
} = mainSlice.actions;

export default mainSlice.reducer;

// Select the current screen
export const selectScreen = (state: AppState): AppScreen => state.screen;

// Selects if there is an active route
export const selectActiveRoute = (state: AppState): boolean => state.activeRoute;

// Selects if the user is reporting a location
export const selectIsReporting = (state: AppState): boolean => state.isReporting;

// Selects the list of positions
export const selectPositions = (state: AppState): Position[] => state.positions;

// Selects the active position
export const selectActivePos = (state: AppState): Position => state.activePos!;

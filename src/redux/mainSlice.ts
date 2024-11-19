import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

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

// Represents a path that can be blocked
export type Path = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    blocked: boolean;
    id: string;
};

// Creates a new path
export const makePath = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
): Path => ({
    startX,
    startY,
    endX,
    endY,
    blocked: false,
    id: nanoid()
});

export type AppState = {
    screen: AppScreen; // Current screen
    activeRoute: boolean; // Is there an active route?
    isReporting: boolean; // Is the user reporting a path?
    positions: Position[]; // List of points of blockages
    activePos: Position | null; // Active position
    paths: Path[]; // List of paths
};

const initialState: AppState = {
    screen: AppScreen.Map,
    activeRoute: true,
    isReporting: false,
    positions: [],
    activePos: null,
    paths: [
        makePath(59, 0, 73, 126),
        makePath(-5, 124, 73, 126),
        makePath(73, 126, 44, 212),
        makePath(44, 212, 77, 347),
        makePath(77, 347, -5, 365),
        makePath(77, 347, 172, 322),
        makePath(172, 322, 169, 364),
        makePath(169, 364, 155, 480),
        makePath(169, 364, 385, 276),
        makePath(385, 276, 410, 285),
        makePath(385, 276, 301, 221),
        makePath(301, 221, 400, 214),
        makePath(301, 221, 183, 232),
        makePath(183, 232, 172, 322),
        makePath(183, 232, 183, 159),
        makePath(183, 159, 73, 126),
        makePath(183, 159, 245, 52),
        makePath(245, 52, 338, 45),
        makePath(338, 45, 420, 0)
    ]
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
        },

        // Toggles if a path is blocked
        togglePathBlocked(state: AppState, action: PayloadAction<string>) {
            state.paths = state.paths.map((path) =>
                path.id === action.payload
                    ? {
                          ...path,
                          blocked: !path.blocked
                      }
                    : path
            );
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
    togglePathBlocked,
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

// Selects all paths
export const selectPaths = (state: AppState): Path[] => state.paths;

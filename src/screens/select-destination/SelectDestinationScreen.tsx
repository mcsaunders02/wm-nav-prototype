import { useDispatch } from "react-redux";
import {
    AppScreen,
    setActiveRoute,
    setScreen
} from "../../redux/mainSlice";
import { SelectDestination } from "./SelectDestination";
import { SelectStartLocation } from "./SelectStartLocation";

// This screen lets you select the destination
export const SelectDestinationScreen = () => {
    const dispatch = useDispatch();

    return (
        <div className="screen select-dest-screen">
            <SelectDestination
                text="Select Destination"
                locations={["Location 1", "Location 2", "Location 3", "Location 4"]}
            />

            <SelectStartLocation
                text="Select Current Location"
                locations={["Current Location", "Location 2", "Location 3", "Location 4"]}
            />

            <button
                className="select-dest-button"
                onClick={() => {
                    dispatch(setScreen(AppScreen.Map));
                    dispatch(setActiveRoute(true));
                }}
            >
                Confirm Destination
            </button>
        </div>
    );
};

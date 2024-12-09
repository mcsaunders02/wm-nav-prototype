import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    selectDestination,
    selectStartLocation,
    setActiveRoute,
    setDestination,
    setJustSelectedRoute,
    setScreen,
    setStartLocation
} from "../../redux/mainSlice";
import { SelectLocationInput } from "./SelectLocationInput";

// This screen lets you select the destination
export const SelectDestinationScreen = () => {
    const dispatch = useDispatch();

    const destination = useSelector(selectDestination);
    const startLocation = useSelector(selectStartLocation);

    return (
        <div className="screen select-dest-screen">
            <SelectLocationInput
                text="Select Destination"
                locations={["Location 1", "Location 2", "Location 3", "Location 4"]}
                otherLocation={startLocation}
                updateState={(value) => dispatch(setDestination(value))}
                isMain={true}
            />

            <SelectLocationInput
                text="Select Current Location"
                locations={["Current Location", "Location 2", "Location 3", "Location 4"]}
                otherLocation={destination}
                updateState={(value) => dispatch(setStartLocation(value))}
                isMain={false}
            />

            <button
                className="select-dest-button"
                onClick={() => {
                    if (destination.trim() !== "") {
                        dispatch(setScreen(AppScreen.Map));
                        dispatch(setActiveRoute(true));
                        dispatch(setJustSelectedRoute(true));
                    }
                }}
            >
                Confirm Destination
            </button>
        </div>
    );
};

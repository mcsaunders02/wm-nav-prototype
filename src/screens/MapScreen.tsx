import { useDispatch } from "react-redux";
import { AppScreen, setScreen } from "../redux/mainSlice";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    return (
        <div className="screen map-screen">
            {/* This actually serves as a button, so you click on it and get taken to the new page */}
            <div
                className="map-destination-input"
                onClick={() => dispatch(setScreen(AppScreen.SelectDestination))}
            >
                towards Destination
            </div>
            <img className="search-icon" src="./search.svg" alt="Search"></img>
        </div>
    );
};

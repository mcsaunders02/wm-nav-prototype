import { useDispatch } from "react-redux";
import { AppScreen, setScreen } from "../redux/mainSlice";
import { useState } from "react";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    // Is there currently a route in progress?
    const [hasRoute, setHasRoute] = useState(true);

    return (
        <div className="screen map-screen">
            {/* This actually serves as a button, so you click on it and get taken to the new page */}
            <div className="one-container">
                <div
                    className="map-destination-input"
                    onClick={() => dispatch(setScreen(AppScreen.SelectDestination))}
                >
                    towards Destination
                </div>
                <img className="search-icon" src="./search.svg" alt="Search"></img>
            </div>

            {hasRoute ? (
                <div className="next-direction-bar">
                    <img src="./leftarrow.svg" alt="Left Arrow"></img>

                    <div className="next-direction">200 ft at Landrum Dr</div>

                    <div className="exit-route-button" onClick={() => setHasRoute(false)}>Exit</div>
                </div>
            ) : (
                <span style={{ height: "60px" }}></span>
            )}
        </div>
    );
};

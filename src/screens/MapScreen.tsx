import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    selectActiveRoute,
    setActiveRoute,
    setScreen
} from "../redux/mainSlice";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    const activeRoute = useSelector(selectActiveRoute);

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

            {activeRoute ? (
                <div className="next-direction-bar">
                    <img src="./leftarrow.svg" alt="Left Arrow"></img>

                    <div className="next-direction">200 ft at Landrum Dr</div>

                    <div
                        className="exit-route-button"
                        onClick={() => dispatch(setActiveRoute(false))}
                    >
                        Exit
                    </div>
                </div>
            ) : (
                <span style={{ height: "60px" }}></span>
            )}

            <div className="map">
                <img width="400px" height="480px" src="./mymap.png" alt="A map containing paths"></img>
            </div>
        </div>
    );
};

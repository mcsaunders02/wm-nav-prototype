import { useSelector } from "react-redux";
import "./index.css";
import { AppScreen, selectActiveRoute, selectScreen } from "./redux/mainSlice";
import { MapScreen } from "./screens/MapScreen";
import { SelectDestinationScreen } from "./screens/SelectDestinationScreen";

export const App = () => {
    const screen = useSelector(selectScreen);
    const activeRoute = useSelector(selectActiveRoute);

    return (
        <div className="main">
            <div className="phone-container">
                <div className="center-horizontal">
                    <div className="phone-camera"></div>
                </div>

                {screen === AppScreen.Map ? (
                    <MapScreen />
                ) : screen === AppScreen.SelectDestination ? (
                    <SelectDestinationScreen />
                ) : (
                    <div className="screen"></div>
                )}

                {activeRoute ? (
                    <div className="bottom-display">
                        <div className="time-left-display">12 min</div>
                        <div className="time-display">12:22 PM</div>
                    </div>
                ) : (
                    <div className="bottom-display display-no-route">
                        No Route Selected
                    </div>
                )}
            </div>
        </div>
    );
};

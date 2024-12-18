import { useSelector } from "react-redux";
import "./index.css";
import {
    AppScreen,
    selectActiveRoute,
    selectIsReporting,
    selectScreen
} from "./redux/mainSlice";
import { MapScreen } from "./screens/MapScreen";
import { SelectDestinationScreen } from "./screens/select-destination/SelectDestinationScreen";
import { ReportBlockageScreen } from "./screens/ReportBlockageScreen";
import { ViewBlockageScreen } from "./screens/ViewBlockageScreen";

export const App = () => {
    const screen = useSelector(selectScreen);
    const activeRoute = useSelector(selectActiveRoute);
    const isReporting = useSelector(selectIsReporting);

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
                ) : screen === AppScreen.ReportBlockage ? (
                    <ReportBlockageScreen />
                ) : (
                    <ViewBlockageScreen />
                )}

                {isReporting ? (
                    <div className="bottom-display display-no-route">Select a Point</div>
                ) : activeRoute ? (
                    <div className="bottom-display">
                        <div className="time-left-display">12 min</div>
                        <div className="time-display">ETA: 12:22 PM</div>
                    </div>
                ) : (
                    <div className="bottom-display display-no-route">
                        
                    </div>
                )}
            </div>
        </div>
    );
};

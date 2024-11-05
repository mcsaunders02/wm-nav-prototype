import { useSelector } from "react-redux";
import "./index.css";
import { AppScreen, selectScreen } from "./redux/mainSlice";
import { MapScreen } from "./screens/MapScreen";

export const App = () => {
    const screen = useSelector(selectScreen);

    return (
        <div className="main">
            <div className="phone-container">
                <div className="center-horizontal">
                    <div className="phone-camera"></div>
                </div>

                {screen === AppScreen.Map ? (
                    <MapScreen />
                ) : (
                    <div className="screen"></div>
                )}

                <div className="bottom-display">
                    <div className="time-left-display">12 min</div>
                    <div className="time-display">12:22 PM</div>
                </div>
            </div>
        </div>
    );
};

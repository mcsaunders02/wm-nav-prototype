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
            </div>
        </div>
    );
};

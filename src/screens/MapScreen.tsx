import { useDispatch, useSelector } from "react-redux";
import {
    addPosition,
    AppScreen,
    popPosition,
    selectActiveRoute,
    selectIsReporting,
    selectPositions,
    setActivePos,
    setActiveRoute,
    setIsReporting,
    setScreen
} from "../redux/mainSlice";
import classNames from "classnames";
import { useEffect, useRef } from "react";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    const activeRoute = useSelector(selectActiveRoute);
    const isReporting = useSelector(selectIsReporting);
    const positions = useSelector(selectPositions);

    // This is needed to get the position of the map
    const ref = useRef();

    useEffect(() => {
        const listener = (event) => {
            if (isReporting) {
                // Find the x/y coords relative to the map
                const clientRect = ref.current!.getClientRects()[0];

                const x = event.clientX - clientRect.x;
                const y = event.clientY - clientRect.y;

                // Magic numbers are for the position of the report button
                if (x >= 0 && y >= 0 && (x <= 320 || y <= 400)) {
                    dispatch(addPosition([x, y]));
                    dispatch(setIsReporting(false));
                    dispatch(setScreen(AppScreen.ReportBlockage));
                }
            }
        };

        document.addEventListener("click", listener);

        return () => document.removeEventListener("click", listener);
    }, [isReporting, dispatch]);

    return (
        <div
            className={classNames(
                "screen",
                "map-screen",
                isReporting ? "special-cursor" : ""
            )}
        >
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

            <div className="map one-container" ref={ref}>
                <img
                    width="400px"
                    height="480px"
                    src="./mymap.png"
                    alt="A map containing paths"
                ></img>

                {isReporting || (
                    <div className="report-button-container">
                        <button
                            className="report-button"
                            onClick={() => {
                                dispatch(setIsReporting(true));
                            }}
                        >
                            !
                        </button>
                    </div>
                )}

                {positions.map((pos, idx) => (
                    <img
                        className="cone"
                        onClick={() => {
                            if (!isReporting) {
                                dispatch(setActivePos(pos));
                                dispatch(setScreen(AppScreen.HandleBlockage));
                            }
                        }}
                        key={idx}
                        src="./cone.png"
                        style={{ position: "relative", top: pos[1], left: pos[0] }}
                        alt="traffic cone"
                    ></img>
                ))}
            </div>
        </div>
    );
};

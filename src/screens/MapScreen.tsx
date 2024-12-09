import classNames from "classnames";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addPosition,
    AppScreen,
    selectActiveRoute,
    selectIsReporting,
    selectJustSelectedRoute,
    selectPaths,
    selectPositions,
    setActivePos,
    setActiveRoute,
    setDestination,
    setIsReporting,
    setJustSelectedRoute,
    setScreen,
    setStartLocation,
    togglePathBlocked
} from "../redux/mainSlice";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    const activeRoute = useSelector(selectActiveRoute);
    const justSelectedRoute = useSelector(selectJustSelectedRoute);
    const isReporting = useSelector(selectIsReporting);
    const positions = useSelector(selectPositions);
    const paths = useSelector(selectPaths);

    // This is needed to get the position of the map
    const ref = useRef<HTMLDivElement>(null);

    // Is it displaying the "Confirmed Route" text
    const [showConfirmedRoute, setShowConfirmedRoute] = useState(justSelectedRoute);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (isReporting) {
                // Find the x/y coords relative to the map
                const clientRect = ref.current!.getClientRects()[0];

                const x = event.clientX - clientRect.x;
                const y = event.clientY - clientRect.y;

                // Magic numbers are for the position of the report button
                if (x >= 0 && y >= 0 && (x <= 320 || y <= 480)) {
                    const newPos = {
                        x,
                        y,
                        reason: "Construction",
                        id: nanoid()
                    };

                    dispatch(addPosition(newPos));
                    dispatch(setActivePos(newPos));
                    dispatch(setIsReporting(false));
                    dispatch(setScreen(AppScreen.ReportBlockage));
                }
            }
        };

        document.addEventListener("click", listener);

        return () => document.removeEventListener("click", listener);
    }, [isReporting, dispatch]);

    useEffect(() => {
        if (showConfirmedRoute) {
            const timeout = setTimeout(() => {
                setShowConfirmedRoute(false);
                dispatch(setJustSelectedRoute(false));
            }, 1250);

            return () => clearTimeout(timeout);
        }
    }, [showConfirmedRoute]);

    return (
        <div
            className={classNames(
                "screen",
                "map-screen",
                isReporting ? "special-cursor" : ""
            )}
        >
            {/* This actually serves as a button, so you click on it and get taken to the new page */}
            {activeRoute ? (
                <div className="next-direction-bar">
                    <img src="./leftarrow.svg" alt="Left Arrow"></img>

                    <div
                        className={classNames(
                            "next-direction",
                            showConfirmedRoute ? "confirm-fade" : ""
                        )}
                    >
                        {showConfirmedRoute ? "Confirmed Route" : "200 ft at Landrum Dr"}
                    </div>

                    <div
                        className="exit-route-button"
                        onClick={() => dispatch(setActiveRoute(false))}
                    >
                        Exit
                    </div>
                </div>
            ) : (
                <div className="one-container">
                    <div
                        className="map-destination-input"
                        onClick={() => {
                            dispatch(setScreen(AppScreen.SelectDestination));

                            // Clear the destination/location
                            dispatch(setDestination(""));
                            dispatch(setStartLocation(""));
                        }}
                    >
                        Select Destination
                    </div>
                    <img className="search-icon" src="./search.svg" alt="Search"></img>
                </div>
            )}

            <div className="map one-container" ref={ref}>
                <img
                    width="400px"
                    height="560px"
                    src="./mymap.png"
                    alt="A map containing paths"
                ></img>

                <svg width="400" height="560" style={{ userSelect: "none" }}>
                    {paths.map((path, idx) => (
                        <line
                            key={idx}
                            x1={path.startX}
                            x2={path.endX}
                            y1={path.startY}
                            y2={path.endY}
                            style={{
                                stroke: path.blocked
                                    ? "#FF7F27"
                                    : path.partOfPath
                                    ? "#afc5de"
                                    : "black",
                                strokeWidth: "10",
                                cursor: "pointer",
                                pointerEvents: isReporting ? "none" : "all"
                            }}
                            onClick={() => dispatch(togglePathBlocked(path.id))}
                        />
                    ))}
                </svg>

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
                        style={{ position: "relative", top: pos.y, left: pos.x }}
                        alt="traffic cone"
                    ></img>
                ))}

                <div className="report-button-container">
                    <div className="report-button-label">Report Blockage</div>
                </div>

                <div className="report-button-container">
                    <button
                        className="report-button"
                        onClick={() => {
                            dispatch(setIsReporting(!isReporting));
                        }}
                    >
                        {isReporting ? "X" : "!"}
                    </button>
                </div>

                <img
                    src="./pointer.png"
                    width="40px"
                    height="40px"
                    style={{
                        position: "relative",
                        top: 210,
                        left: 160,
                        userSelect: "none"
                    }}
                    alt="pointer"
                ></img>
            </div>
        </div>
    );
};

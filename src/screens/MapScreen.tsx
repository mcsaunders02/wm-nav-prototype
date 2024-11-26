import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addPosition,
    AppScreen,
    selectActiveRoute,
    selectIsReporting,
    selectPaths,
    selectPositions,
    setActivePos,
    setActiveRoute,
    setIsReporting,
    setScreen,
    togglePathBlocked
} from "../redux/mainSlice";
import { nanoid } from "nanoid";

// This screen shows the map
export const MapScreen = () => {
    const dispatch = useDispatch();

    const activeRoute = useSelector(selectActiveRoute);
    const isReporting = useSelector(selectIsReporting);
    const positions = useSelector(selectPositions);
    const paths = useSelector(selectPaths);

    // This is needed to get the position of the map
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (isReporting) {
                // Find the x/y coords relative to the map
                const clientRect = ref.current!.getClientRects()[0];

                const x = event.clientX - clientRect.x;
                const y = event.clientY - clientRect.y;

                // Magic numbers are for the position of the report button
                if (x >= 0 && y >= 0 && (x <= 320 || y <= 400)) {
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
                    Select Destination
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

                <svg width="400" height="480" style={{ userSelect: "none" }}>
                    {paths.map((path, idx) => (
                        <line
                            key={idx}
                            x1={path.startX}
                            x2={path.endX}
                            y1={path.startY}
                            y2={path.endY}
                            style={{
                                stroke: path.blocked ? "#FF7F27" : "black",
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

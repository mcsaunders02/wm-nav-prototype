import { useDispatch } from "react-redux";
import { AppScreen, removeActivePos, setScreen } from "../redux/mainSlice";

// Screen for viewing a blockage
export const ViewBlockageScreen = () => {
    const dispatch = useDispatch();

    return (
        <div className="screen view-blockage-screen">
            <div className="report-blockage">
                <div className="view-blockage-title">
                    Path blocked due to construction (ETA: Fall 2025)
                </div>

                <div className="view-blockage-reason">
                    Update reason for blockage (if applicable):
                </div>

                <input
                    className="view-blockage-change-reason"
                    placeholder="New Reason"
                ></input>

                <div
                    className="view-blockage-reason"
                    style={{ marginTop: "40px", marginBottom: "10px" }}
                >
                    Is this path still blocked?
                </div>

                <div className="view-blockage-buttons">
                    <button
                        className="report-blockage-submit view-blockage-button"
                        onClick={() => dispatch(setScreen(AppScreen.Map))}
                    >
                        Yes
                    </button>

                    <button
                        className="report-blockage-cancel view-blockage-button"
                        onClick={() => {
                            dispatch(removeActivePos());
                            dispatch(setScreen(AppScreen.Map));
                        }}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

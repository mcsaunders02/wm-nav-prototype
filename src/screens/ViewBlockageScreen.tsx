import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    removeActivePos,
    selectActivePos,
    setScreen,
    updateActivePosReason
} from "../redux/mainSlice";
import { useState } from "react";

// Screen for viewing a blockage
export const ViewBlockageScreen = () => {
    const dispatch = useDispatch();

    const pos = useSelector(selectActivePos)!;

    const [newReason, setNewReason] = useState(pos.reason);

    return (
        <div className="screen view-blockage-screen">
            <div className="view-blockage">
                <div className="view-blockage-title">
                    Path blocked due to {pos.reason.toLowerCase()}
                </div>

                <div className="view-blockage-reason">
                    Update reason for blockage (if applicable):
                </div>

                <input
                    className="view-blockage-change-reason"
                    placeholder="New Reason"
                    value={newReason}
                    onChange={(event) => setNewReason(event.target.value)}
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
                        onClick={() => {
                            dispatch(updateActivePosReason(newReason));
                            dispatch(setScreen(AppScreen.Map));
                        }}
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

import classNames from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, popPosition, setScreen } from "../redux/mainSlice";

// Page for reporting blockages
export const ReportBlockageScreen = () => {
    const dispatch = useDispatch();

    const [theReason, setTheReason] = useState("Construction");

    return (
        <div className="screen report-blockage-screen">
            <div className="report-blockage">
                <div className="report-blockage-title">Report Blocked Path</div>

                <div className="report-blockage-reason">Select Reason:</div>

                {["Construction", "Flooding", "Other"].map((reason) => (
                    <div
                        className={classNames(
                            "report-blockage-select",
                            reason === theReason ? "report-blockage-select-active" : ""
                        )}
                        onClick={() => setTheReason(reason)}
                        key={reason}
                    >
                        {reason}
                    </div>
                ))}

                <input
                    className="report-blockage-other"
                    placeholder="Enter Other Reason"
                ></input>

                <div className="report-blockage-buttons">
                    <button
                        className="report-blockage-submit"
                        onClick={() => dispatch(setScreen(AppScreen.Map))}
                    >
                        Confirm
                    </button>

                    <button
                        className="report-blockage-cancel"
                        onClick={() => {
                            dispatch(popPosition());
                            dispatch(setScreen(AppScreen.Map));
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

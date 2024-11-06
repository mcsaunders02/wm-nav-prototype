import classNames from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    popPosition,
    selectActivePos,
    setScreen,
    updateActivePosReason
} from "../redux/mainSlice";

// Page for reporting blockages
export const ReportBlockageScreen = () => {
    const dispatch = useDispatch();

    const activePos = useSelector(selectActivePos)!;

    const [theReason, setTheReason] = useState(activePos.reason);
    const [otherReason, setOtherReason] = useState(
        activePos.reason === "Construction" || activePos.reason === "Flooding"
            ? ""
            : activePos.reason
    );
    const [reasonText, setReasonText] = useState("Construction");

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
                        onClick={() => {
                            setTheReason(reason);

                            if (reason === "Other") {
                                setReasonText(otherReason);
                            } else {
                                setReasonText(reason);
                            }
                        }}
                        key={reason}
                    >
                        {reason}
                    </div>
                ))}

                <input
                    className="report-blockage-other"
                    placeholder="Enter Other Reason"
                    value={otherReason}
                    onChange={(event) => {
                        setOtherReason(event.target.value);

                        if (theReason === "Other") {
                            setReasonText(event.target.value);
                        }
                    }}
                ></input>

                <div className="report-blockage-buttons">
                    <button
                        className="report-blockage-submit"
                        onClick={() => {
                            dispatch(updateActivePosReason(reasonText));
                            dispatch(setScreen(AppScreen.Map));
                        }}
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

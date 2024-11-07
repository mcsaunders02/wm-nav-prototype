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

    // The selected reason for the blockage
    const [selectedReason, setSelectedReason] = useState(activePos.reason);

    // The reason found in the "Other" textbox
    const [otherReasonText, setOtherReasonText] = useState(
        activePos.reason === "Construction" || activePos.reason === "Flooding"
            ? ""
            : activePos.reason
    );

    // The current selected reason to submit
    const [reasonToSubmit, setReasonToSubmit] = useState("Construction");

    return (
        <div className="screen report-blockage-screen">
            <div className="report-blockage">
                <div className="report-blockage-title">Report Blocked Path</div>

                <div className="report-blockage-reason">Select Reason:</div>

                {["Construction", "Flooding", "Other"].map((reason) => (
                    <div
                        className={classNames(
                            "report-blockage-select",
                            reason === selectedReason ? "report-blockage-select-active" : ""
                        )}
                        onClick={() => {
                            setSelectedReason(reason);

                            if (reason === "Other") {
                                setReasonToSubmit(otherReasonText);
                            } else {
                                setReasonToSubmit(reason);
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
                    value={otherReasonText}
                    onChange={(event) => {
                        setOtherReasonText(event.target.value);

                        if (selectedReason === "Other") {
                            setReasonToSubmit(event.target.value);
                        }
                    }}
                ></input>

                <div className="report-blockage-buttons">
                    <button
                        className="report-blockage-submit"
                        onClick={() => {
                            dispatch(updateActivePosReason(reasonToSubmit));
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

import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    selectStartLocation,
    setActiveRoute,
    setDestination,
    setScreen
} from "../../redux/mainSlice";

export const SelectDestination = ({
    text,
    locations
}: {
    text: string;
    locations: string[];
}) => {
    const [inputText, setInputText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    // This should be the destination if this object is for the starting location, or vice versa
    const startLocation = useSelector(selectStartLocation);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" && inputText.trim() !== "") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                setIsOpen(false);

                // Go back to the map screen
                dispatch(setScreen(AppScreen.Map));
                dispatch(setActiveRoute(true));
            }
        };

        const element = document.getElementById(`${text}-input`)!;

        element.addEventListener("keydown", listener);

        return () => element.removeEventListener("keydown", listener);
    }, [text, inputText, dispatch]);

    return (
        <div className="search-container-full">
            <div className="one-container">
                <input
                    id={`${text}-input`}
                    className="select-dest-input"
                    placeholder={text}
                    value={inputText}
                    onChange={(event) => {
                        setInputText(event.target.value);

                        if (event.target.value !== startLocation)
                            dispatch(setDestination(event.target.value));
                    }}
                    onFocus={() => setIsOpen(true)}
                    autoFocus={true}
                    autoComplete="off"
                ></input>
                <img className="search-icon" src="./search.svg" alt="Search"></img>
            </div>

            {isOpen ? (
                <div className="search-select-container">
                    {locations.map((value) => {
                        return (
                            <div
                                className={classNames(
                                    value === startLocation
                                        ? "search-select-inactive"
                                        : "search-select",
                                    value === "Current Location"
                                        ? "search-select-current"
                                        : ""
                                )}
                                key={value}
                                onClick={() => {
                                    if (value !== startLocation) {
                                        setInputText(value);
                                        setIsOpen(false);
                                        dispatch(setDestination(value));
                                    }
                                }}
                            >
                                {value}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <span style={{ height: "200px" }}></span>
            )}
        </div>
    );
};

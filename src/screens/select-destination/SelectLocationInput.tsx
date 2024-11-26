import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, setActiveRoute, setScreen } from "../../redux/mainSlice";

// This component lets you select a location for the select destination screen
export const SelectLocationInput = ({
    text,
    locations,
    otherLocation, // The other location to use (so for the current destination it would be the current location instead)
    updateState, // Function to update the React state
    isMain // Is this the main input
}: {
    text: string;
    locations: string[];
    otherLocation: string;
    updateState: (value: string) => void;
    isMain: boolean;
}) => {
    const [inputText, setInputText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" && inputText.trim() !== "") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                setIsOpen(false);

                if (isMain) {
                    // Go back to the map screen
                    dispatch(setScreen(AppScreen.Map));
                    dispatch(setActiveRoute(true));
                }
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

                        if (event.target.value !== otherLocation)
                            updateState(event.target.value);
                    }}
                    onFocus={() => setIsOpen(true)}
                    autoFocus={isMain}
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
                                    value === otherLocation
                                        ? "search-select-inactive"
                                        : "search-select",
                                    value === "Current Location"
                                        ? "search-select-current"
                                        : ""
                                )}
                                key={value}
                                onClick={() => {
                                    if (value !== otherLocation) {
                                        setInputText(value);
                                        setIsOpen(false);
                                        updateState(value);
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

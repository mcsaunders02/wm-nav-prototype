import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    AppScreen,
    AppState,
    setActiveRoute,
    setDestination,
    setScreen,
    setStartLocation
} from "../redux/mainSlice";
import classNames from "classnames";
import { AppDispatch } from "../redux/store";

const submitDest = (dispatch: AppDispatch) => {
    dispatch(setScreen(AppScreen.Map));
    dispatch(setActiveRoute(true));
};

// Just use an enum for the 2 types of selectdest elements
enum SelectDestType {
    Destination,
    Start
}

// Helper component for these text inputs
// onSubmit lets you do something with the text value as a parameter
const SelectDest = ({
    text,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autofocus = false,
    autoSubmit = false,
    locations,
    type
}: {
    text: string;
    autofocus?: boolean;
    autoSubmit?: boolean;
    locations: string[];
    type: SelectDestType;
}) => {
    const [inputText, setInputText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    // This should be the destination if this object is for the starting location, or vice versa
    const otherLocation = useSelector((state: AppState) =>
        type === SelectDestType.Destination ? state.startLocation : state.destination
    );

    // Updates the text in the store
    const updateStoreText = (text: string) => {
        if (type === SelectDestType.Destination) {
            dispatch(setDestination(text));
        } else {
            dispatch(setStartLocation(text));
        }
    };

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" && inputText.trim() !== "") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                setIsOpen(false);

                if (autoSubmit) {
                    submitDest(dispatch);
                }
            }
        };

        const element = document.getElementById(`${text}-input`)!;

        element.addEventListener("keydown", listener);

        return () => element.removeEventListener("keydown", listener);
    }, [text, inputText, dispatch, autoSubmit]);

    return (
        <div className="search-container-full">
            <div className="one-container">
                <input
                    id={`${text}-input`}
                    className="select-dest-input"
                    placeholder={text}
                    value={inputText}
                    onChange={(event) => () => {
                        setInputText(event.target.value);
                        updateStoreText(event.target.value);
                    }}
                    onFocus={() => setIsOpen(true)}
                    autoFocus={autofocus}
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
                                        updateStoreText(value);
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

// This screen lets you select the destination
export const SelectDestinationScreen = () => {
    const dispatch = useDispatch();

    return (
        <div className="screen select-dest-screen">
            <SelectDest
                text="Select Destination"
                locations={["Location 1", "Location 2", "Location 3", "Location 4"]}
                autofocus={true}
                autoSubmit={true}
                type={SelectDestType.Destination}
            />

            <SelectDest
                text="Select Current Location"
                locations={["Current Location", "Location 2", "Location 3", "Location 4"]}
                type={SelectDestType.Start}
            />

            <button
                className="select-dest-button"
                onClick={() => {
                    submitDest(dispatch);
                }}
            >
                Confirm Destination
            </button>
        </div>
    );
};

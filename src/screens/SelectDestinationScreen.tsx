import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, setActiveRoute, setScreen } from "../redux/mainSlice";
import classNames from "classnames";
import { AppDispatch } from "../redux/store";

const submitDest = (dispatch: AppDispatch) => {
    dispatch(setScreen(AppScreen.Map));
    dispatch(setActiveRoute(true));
}

// Helper component for these text inputs
// onSubmit lets you do something with the text value as a parameter
const SelectDest = ({
    text,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    autofocus = false,
    autoSubmit = false,
    locations
}: {
    text: string;
    autofocus?: boolean;
    autoSubmit?: boolean;
    locations: string[];
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
                    onChange={(event) => setInputText(event.target.value)}
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
                                className={classNames("search-select", value === "Current Location" ? "search-select-current" : "")}
                                key={value}
                                onClick={() => {
                                    setInputText(value);
                                    setIsOpen(false);
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
            <SelectDest text="Select Destination" locations={["Location 1", "Location 2", "Location 3", "Location 4"]} autofocus={true} autoSubmit={true} />

            <SelectDest text="Select Current Location" locations={["Current Location", "Location 2", "Location 3", "Location 4"]} />

            <button className="select-dest-button" onClick={() => {
                submitDest(dispatch);
            }}>
                Confirm Destination
            </button>
        </div>
    );
};

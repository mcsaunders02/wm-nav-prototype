import classNames from "classnames";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setStartLocation } from "../../redux/mainSlice";

export const SelectStartLocation = ({
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
    const destination = useSelector(selectDestination);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" && inputText.trim() !== "") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                setIsOpen(false);
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

                        if (event.target.value !== destination)
                            dispatch(setStartLocation(event.target.value));
                    }}
                    onFocus={() => setIsOpen(true)}
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
                                    value === destination
                                        ? "search-select-inactive"
                                        : "search-select",
                                    value === "Current Location"
                                        ? "search-select-current"
                                        : ""
                                )}
                                key={value}
                                onClick={() => {
                                    if (value !== destination) {
                                        setInputText(value);
                                        setIsOpen(false);
                                        dispatch(setStartLocation(value));
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

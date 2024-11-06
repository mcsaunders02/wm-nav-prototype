import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, setScreen } from "../redux/mainSlice";

// Helper component for these text inputs
// onSubmit lets you do something with the text value as a parameter
const SelectDest = ({
    text,
    onSubmit = (_) => {},
    autofocus = false
}: {
    text: string;
    onSubmit?: (text: string) => void;
    autofocus?: boolean;
}) => {
    const [inputText, setInputText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter" && inputText.trim() !== "") {
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }

                setIsOpen(false);
                onSubmit(inputText);
            }
        };

        const element = document.getElementById(`${text}-input`)!;

        element.addEventListener("keydown", listener);

        return () => element.removeEventListener("keydown", listener);
    }, [onSubmit, text, inputText]);

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
                ></input>
                <img className="search-icon" src="./search.svg" alt="Search"></img>
            </div>

            {isOpen && <div className="search-container">Test</div>}
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
                onSubmit={(_) => {
                    dispatch(setScreen(AppScreen.Map));
                }}
                autofocus={true}
            />

            <SelectDest text="Select Current Location" />
        </div>
    );
};

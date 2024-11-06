import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, setScreen } from "../redux/mainSlice";

// Helper component for these text inputs
// onSubmit lets you do something with the text value as a parameter
const SelectDest = ({
    text,
    onSubmit
}: {
    text: string;
    onSubmit: (text: string) => void;
}) => {
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                onSubmit(inputText);
            }
        };

        const element = document.getElementById(`${text}-input`)!;

        element.addEventListener("keydown", listener);

        return () => element.removeEventListener("keydown", listener);
    }, [onSubmit, text, inputText]);

    return (
        <div className="one-container">
            <input
                id={`${text}-input`}
                className="select-dest-input"
                placeholder={text}
                onSubmit={() => onSubmit(inputText)}
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
            ></input>
            <img className="search-icon" src="./search.svg" alt="Search"></img>
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
                onSubmit={(text) => {
                    if (text.trim() !== "") {
                        dispatch(setScreen(AppScreen.Map));
                    }
                }}
            />

            <SelectDest text="Current Location" onSubmit={(text) => {}} />
        </div>
    );
};

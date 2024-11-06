import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppScreen, setScreen } from "../redux/mainSlice";

// Helper component for these text inputs
const SelectDest = ({ text, onSubmit }: { text: string; onSubmit: () => void }) => {
    useEffect(() => {
        const listener = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                onSubmit();
            }
        };

        const element = document.getElementById(`${text}-input`)!;

        element.addEventListener("keydown", listener);

        return () => element.removeEventListener("keydown", listener);
    }, [onSubmit]);

    return (
        <div className="one-container">
            <input
                id={`${text}-input`}
                className="select-dest-input"
                placeholder={text}
                onSubmit={onSubmit}
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
                onSubmit={() => dispatch(setScreen(AppScreen.Map))}
            />

            <SelectDest text="Current Location" onSubmit={() => {}} />
        </div>
    );
};

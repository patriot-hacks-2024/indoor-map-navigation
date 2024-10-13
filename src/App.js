import logo from './logo.svg';
import './App.css';
import SpeechToText from "./STT/SpeechToText";
import {useState} from "react";
import Room from "./types/Room";
import RoomList from "./components/RoomList";
import {textToUserCommand, textToAdminCommand} from "./chat/textToCommand";

function App() {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const toggleMode = () => {
        setIsAdminMode((prevMode) => !prevMode);
    };

    // Initialize state with an array of Room objects
    const [rooms, setRooms] = useState([
        new Room("Conference Room", "A meeting about a hackathon event: PatriotHack 2024", [1, 2]),
        new Room("Classroom 101", "A software engineering class", [3, 4]),
    ]);

    // Function to edit a specific room
    const updateOccupation = (name, newOccupation) => {
        const updatedRooms = rooms.map((room, i) =>
            room.name === name
                ? new Room(name, newOccupation || room.occupation, room.entrance)
                : room
        );
        setRooms(updatedRooms); // Update state with the modified array
    };

    const userNavigateToRoom = async (userMessage) => {
        let room = await textToUserCommand(userMessage, rooms);
        let entrance = [-1, -1];
        for (let r of rooms) {
            if (r.name === room) {
                entrance = r.entrance;
            }
        }
        console.log("Navigate to room: " + room + ", entrance is at " + entrance);
    }

    const adminUpdateRoom = async (userMessage) => {
        let gpt = await textToAdminCommand(userMessage, rooms);
        if(!gpt)
        {
            console.error("Incorrect chatgpt response: " + gpt);
            return;
        }
        let result = gpt.split('%');
        if (result.length < 2) {
            console.error("Incorrect chatgpt response: " + gpt);
            return;
        }
        let room = result[0];
        let occu = result[1];
        let entrance = [-1, -1];
        for (let r of rooms) {
            if (r.name === room) {
                entrance = r.entrance;
            }
        }
        console.log("Update to room: " + room + ", new occupation: " + occu);
        updateOccupation(room, occu);
    }

    return (
        <div className={`app-container ${isAdminMode ? "admin-mode" : "user-mode"}`}>
            {/* Top 100px Control */}
            <div className="top-control">
                <span>{isAdminMode ? "Fuse at Mason Square (Admin Mode)" : "Fuse at Mason Square"}</span>
                <button className="toggle-button" onClick={toggleMode}>
                    {isAdminMode ? "Switch to User" : "Switch to Admin"}
                </button>
            </div>

            {/* Middle Section */}
            <div className="middle-section">
                <div className="left-control">Map</div>
                <div className="right-control"><RoomList rooms={rooms}/></div>
            </div>

            {/* Bottom 300px Control */}
            <div className="bottom-control"><SpeechToText
                onResultCallback={isAdminMode ? adminUpdateRoom : userNavigateToRoom}/></div>
        </div>
    );
}

export default App;

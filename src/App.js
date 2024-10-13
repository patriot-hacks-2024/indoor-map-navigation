import './App.css';
import SpeechToText from "./STT/SpeechToText";
import {useState} from "react";
import Room from "./types/Room";
import RoomList from "./components/RoomList";
import {textToAdminCommand, textToUserCommand} from "./chat/textToCommand";
import FloorMap from "./components/FloorMap";
import {grid1, grid2, grid3, stair1, stair2, stair3, start1} from "./data/mapData";
import LeftControl from "./components/LeftControl";

function App() {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const toggleMode = () => {
        setIsAdminMode((prevMode) => !prevMode);
    };

    // Initialize state with an array of Room objects
    const [rooms, setRooms] = useState([
        new Room("Conference Room", "A meeting about a hackathon event: PatriotHack 2024", 1, [1, 2]),
        new Room("Classroom 101", "A software engineering class", 2, [3, 4]),
    ]);

    const [startPoint, setStartPoint] = useState(null);

    const [targetRoom, setTargetRoom] = useState(null);

    const floors = [
        {
            name: "1F",
            floor: <FloorMap grid={grid1} dest={targetRoom?.entrance ?? null} stairs={stair1}
                             navToOtherFloors={targetRoom?.floor === "1F" ?? null} start={start1}
                             updateSelectedStair={setStartPoint}/>
        },
        {
            name: "2F",
            floor: <FloorMap grid={grid2} dest={targetRoom?.entrance ?? null} stairs={stair2}
                             navToOtherFloors={targetRoom?.floor === "2F" ?? null} start={startPoint}
                             updateSelectedStair={setStartPoint}/>
        },
        {
            name: "3F",
            floor: <FloorMap grid={grid3} dest={targetRoom?.entrance ?? null} stairs={stair3}
                             navToOtherFloors={targetRoom?.floor === "3F" ?? null} start={startPoint}
                             updateSelectedStair={setStartPoint}/>
        },
    ]

    // Function to edit a specific room
    const updateOccupation = (name, newOccupation) => {
        const updatedRooms = rooms.map((room, i) =>
            room.name === name
                ? new Room(name, newOccupation || room.occupation, room.floor, room.entrance)
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
                setTargetRoom(r);
                break;
            }
        }
        console.log("Navigate to room: " + room + ", entrance is at " + entrance);
    }

    const adminUpdateRoom = async (userMessage) => {
        let gpt = await textToAdminCommand(userMessage, rooms);
        if (!gpt) {
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
                    {isAdminMode ? " " : "  "}
                </button>
            </div>

            {/* Middle Section */}
            <div className="middle-section">
                <div className="left-control"><LeftControl floors={floors}/></div>
                <div className="right-control"><RoomList rooms={rooms}/></div>
            </div>

            {/* Bottom 300px Control */}
            <div className="bottom-control"><SpeechToText
                onResultCallback={isAdminMode ? adminUpdateRoom : userNavigateToRoom}/></div>
        </div>
    );
}

export default App;

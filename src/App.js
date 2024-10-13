import './App.css';
import SpeechToText from "./STT/SpeechToText";
import {useState} from "react";
import Room from "./types/Room";
import RoomList from "./components/RoomList";
import {textToAdminCommand, textToUserCommand} from "./chat/textToCommand";
import FloorMap from "./components/FloorMap";
import {grid1, grid2, grid3, start1} from "./data/mapData";
import LeftControl from "./components/LeftControl";

function App() {
    const [isAdminMode, setIsAdminMode] = useState(false);

    const toggleMode = () => {
        setIsAdminMode((prevMode) => !prevMode);
    };

    // Initialize state with an array of Room objects
    const [rooms, setRooms] = useState([
        new Room("Conference Room", "A meeting about a hackathon event: PatriotHack 2024", '1F', [40, 76]),
        new Room("Classroom 201", "A software engineering class", '2F', [42, 10]),
        new Room("Ballroom 304", "Christmas Ball", '3F', [17, 80]),
    ]);

    const [startPoint, setStartPoint] = useState(null);

    const setStartPointVerbose = (val) => {
        console.log("setStartPointVerbose", val);
        setStartPoint({...val});
    }

    const [targetRoom, setTargetRoom] = useState(null);

    const setTargetRoomVerbose = (val) => {
        console.log("setTargetRoomVerbose", val);
        setTargetRoom({...val});
    }

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
                setTargetRoomVerbose(r);
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
                {/*<div className="left-control"><LeftControl floors={[*/}
                {/*    <FloorMap key={"1F"} name={"1F"} grid={grid1} targetRoom={targetRoom} start={start1}*/}
                {/*              updateSelectedStair={setStartPointVerbose}/>,*/}
                {/*    <FloorMap key={"2F"} name={"2F"} grid={grid2} targetRoom={targetRoom} start={startPoint}*/}
                {/*              updateSelectedStair={setStartPointVerbose}/>,*/}
                {/*    <FloorMap key={"3F"} name={"3F"} grid={grid3} targetRoom={targetRoom} start={startPoint}*/}
                {/*              updateSelectedStair={setStartPointVerbose}/>,*/}
                {/*]}/></div>*/}
                <div className="left-control"><LeftControl floors={[
                    {name: "1F", grid: grid1, startPoint: start1},
                    {name: "2F", grid: grid2, startPoint: startPoint},
                    {name: "3F", grid: grid3, startPoint: startPoint},
                ]} targetRoom={targetRoom} updateSelectedStairCallback={setStartPointVerbose}/></div>
                <div className="right-control"><RoomList rooms={rooms}/></div>
            </div>

            {/* Bottom 300px Control */}
            <div className="bottom-control"><SpeechToText
                onResultCallback={isAdminMode ? adminUpdateRoom : userNavigateToRoom}/></div>
        </div>
    );
}

export default App;

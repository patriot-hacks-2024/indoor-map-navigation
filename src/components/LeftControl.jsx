import React, {useEffect, useState} from "react";
import FloorMap from "./FloorMap";
import {start1} from "../data/mapData";

const LeftControl = ({floors, updateSelectedStairCallback, selectedStair, targetRoom}) => {
    // floors: {name: "1F", grid: grid1, startPoint: start1},

    const [selectedFloor, setSelectedFloor] = useState(floors[0]);
    // const [leftCtrlShouldJump, setLeftCtrlShouldJump] = useState(false);

    const changeToFloor = (name) => {
        if (selectedFloor.name === name) return;
        console.log("changeToFloor", name);
        for (let floor of floors) {
            if (floor.name === name) {
                setSelectedFloor({...floor});
                break;
            }
        }
    }

    useEffect(() => {
        setSelectedFloor(floors[0]);
        // setLeftCtrlShouldJump(true);
    }, [targetRoom]);

    const handleButtonClick = (floor) => {
        console.log(floor);
        setSelectedFloor(floor);
    };

    return (
        <div style={styles.leftControlContainer}>
            <div style={styles.buttonGroup}>
                {floors.map((floor) => (
                    <button
                        key={floor.name}
                        onClick={() => {
                            handleButtonClick(floor);
                        }}
                        style={{
                            ...styles.button,
                            backgroundColor: floor.name === selectedFloor.name ? "lightblue" : "transparent"
                        }}
                    >
                        {floor.name}
                    </button>
                ))}
            </div>

            <div style={styles.mapContainer}>
                <FloorMap name={selectedFloor.name} grid={selectedFloor.grid}
                          updateSelectedStairCallback={updateSelectedStairCallback}
                          start={selectedFloor.name === "1F" ? start1 : selectedStair} targetRoom={targetRoom}
                          refresh={selectedFloor}
                          changeFloorCallback={changeToFloor}/>
            </div>
        </div>
    );
};

// 样式
const styles = {
    leftControlContainer: {},
    buttonGroup: {
        padding: 0,
    },
    button: {
        marginRight: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
};

export default LeftControl;

import React, {useState} from "react";
import FloorMap from "./FloorMap";

const LeftControl = ({floors, updateSelectedStair, targetRoom}) => {
    // floors: {name: "1F", grid: grid1, startPoint: start1},

    const [selectedFloor, setSelectedFloor] = useState(floors[0]);

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
                        onClick={() => handleButtonClick(floor)}
                        style={styles.button}
                    >
                        {floor.name}
                    </button>
                ))}
            </div>

            <div style={styles.mapContainer}>
                <FloorMap name={selectedFloor.name} grid={selectedFloor.grid} updateSelectedStair={updateSelectedStair}
                          start={selectedFloor.startPoint} targetRoom={targetRoom} refresh={selectedFloor}/>
            </div>
        </div>
    );
};

// 样式
const styles = {
    leftControlContainer: {
        background: "red",
    },
    buttonGroup: {
        padding: 0,
    },
    button: {
        marginRight: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        background: "transparent",
    },
};

export default LeftControl;

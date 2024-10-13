import React, { useState } from "react";

const LeftControl = ({floors}) => {
    // floors: [{name: "1F", floor: FloorMap}]

    const [selectedFloor, setSelectedFloor] = useState(null);

    const handleButtonClick = (floor) => {
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
                {selectedFloor ? (
                    selectedFloor.floor
                ) : (
                    <p>Please select an image</p>
                )}
            </div>
        </div>
    );
};

// 样式
const styles = {
    leftControlContainer: {
        width: "70%",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        borderRadius: "8px",
    },
    buttonGroup: {
        marginBottom: "20px",
    },
    button: {
        marginRight: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
    },
    mapContainer: {
        marginTop: "20px",
    },
    map: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
    },
};

export default LeftControl;

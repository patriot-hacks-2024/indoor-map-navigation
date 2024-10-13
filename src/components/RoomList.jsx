
// React 组件：展示房间数组
const RoomList = ({ rooms }) => {
    return (
        <div style={styles.roomListContainer}>
            <h2>Room List</h2>
            <ul>
                {rooms.map((room, index) => (
                    <li key={index} style={styles.roomItem}>
                        <h3>{room.name}</h3>
                        <p>Occupation: {room.occupation}</p>
                        <p>Entrance Coordinates: [{room.entrance[0]}, {room.entrance[1]}]</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 样式对象
const styles = {
    roomListContainer: {
        backgroundColor: 'transparent',
    },
    roomItem: {
        backgroundColor: '#ebebed',
        padding: '15px',
        margin: '10px 0',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',
    },
};

export default RoomList;
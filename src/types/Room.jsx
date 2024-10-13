class Room {
    constructor(name, occupation, entrance) {
        this.name = name; // string
        this.occupation = occupation; // string
        this.entrance = entrance; // [int, int] array representing tuple
    }
}

function roomsToString(roomArray) {
    let output = '';

    roomArray.forEach((room, index) => {
        output += `Room name: ${room.name}, `;
        output += `Occupation: ${room.occupation}\n`;
    });

    return output;
}

export default Room;
export { roomsToString };
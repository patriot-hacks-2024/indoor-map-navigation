import {roomsToString} from "../types/Room";
const { AzureOpenAI } = require("openai");

async function textToCommand(messages, rooms) {
    const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT || "<endpoint>";
    const apiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY || "<api key>";

    const apiVersion = "2024-08-01-preview";
    const deployment = "gpt-4o"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });
    const result = await client.chat.completions.create({
        messages: messages,
        model: "",
    });

    for (const choice of result.choices) {
        return choice.message.content;
    }

    return "";
}

async function textToUserCommand(text, rooms) {
    let messages = [
            { role: "system", content: "You are a front desk receptionist for a building. " +
                    "You will be provided with a list of rooms in the building, including the room names " +
                    "and their current occupation status. Visitors to the building will ask you which room they " +
                    "want to go to or what type of room they want, and you need to return the name of the room. " +
                    "Please only return the room name without adding any other content or punctuation." },
            { role: "user", content: "Room: A, Occupation: O1\n" +
                    "Room: B, Occupation: O2\n\n" +
                    "Visitor: I want to go to a room that does O1." },
            { role: "assistant", content: "A" },
            { role: "user", content: roomsToString(rooms) + "\nVisitor: " + text },
        ]

    return textToCommand(messages, rooms);
}

async function textToAdminCommand(text, rooms) {
    let messages = [
        { role: "system", content: "You are a building administrator. You will be provided with a list of rooms in " +
                "the building, including the room names and their current occupation status. Visitors to the building " +
                "will inform you of a room and ask to update the new occupation status of that room. You need to " +
                "return the name of the room and the new occupation status, separated by a %. Please only return " +
                "room name%occupation without adding any other content or punctuation." },
        { role: "user", content: "Room: A, Occupation: O1\n" +
                "Room: B, Occupation: O2\n\n" +
                "Visitor: I want to hold a short meeting about CCC in room A." },
        { role: "assistant", content: "A%A short meeting about CCC" },
        { role: "user", content: roomsToString(rooms) + "\nVisitor: " + text },
    ]

    return textToCommand(messages, rooms);
}

export {textToUserCommand, textToAdminCommand};
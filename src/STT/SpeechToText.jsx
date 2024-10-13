import React, { useState } from "react";

const SpeechToText = ({onResultCallback}) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("What can I help you with?");

    // Check if the browser supports the SpeechRecognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false; // Not continuous listening
    recognition.interimResults = false; // Only final results
    recognition.lang = "en-US"; // Set language to English

    // Start the speech recognition
    const startListening = () => {
        setIsListening(true);
        recognition.start();
    };

    // Stop the speech recognition
    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    // Handle the result of the speech recognition
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
        onResultCallback(speechToText);
    };

    // Handle errors
    recognition.onerror = (event) => {
        setTranscript("Sorry, I couldn't understand that. Please try again.");
        setIsListening(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.promptText}>{transcript}</div>
            <button
                onMouseDown={startListening}
                onMouseUp={stopListening}
                style={{
                    ...styles.micButton,
                    backgroundImage: isListening
                        ? "url(\"./recordButton_on.png\")" // Image when listening
                        : "url(\"./recordButton_off.png\")" // Image when not listening
                }}
            >
            </button>
        </div>
    );
};

// CSS styles for the component
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
    },
    promptText: {
        fontSize: "24px",
        color: "white",
        marginBottom: "20px",
        textAlign: "center",
    },
    micButton: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        border: "none",
        color: "white",
        fontSize: "24px",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        backgroundSize: "cover"
    },
};

export default SpeechToText;

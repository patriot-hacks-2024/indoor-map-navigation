const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const apiKey = process.env.AZURE_STT_API_KEY || "<api key>";
const region = process.env.AZURE_STT_REGION || "<region>";

console.log(apiKey, region)

const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.AZURE_STT_API_KEY, process.env.AZURE_STT_REGION);
speechConfig.speechRecognitionLanguage = "en-US";

// function fromFile() {
//     let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync("YourAudioFile.wav"));
//     let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

//     speechRecognizer.recognizeOnceAsync(result => {
//         switch (result.reason) {
//             case sdk.ResultReason.RecognizedSpeech:
//                 console.log(`RECOGNIZED: Text=${result.text}`);
//                 break;
//             case sdk.ResultReason.NoMatch:
//                 console.log("NOMATCH: Speech could not be recognized.");
//                 break;
//             case sdk.ResultReason.Canceled:
//                 const cancellation = sdk.CancellationDetails.fromResult(result);
//                 console.log(`CANCELED: Reason=${cancellation.reason}`);

//                 if (cancellation.reason == sdk.CancellationReason.Error) {
//                     console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
//                     console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
//                     console.log("CANCELED: Did you set the speech resource key and region values?");
//                 }
//                 break;
//         }
//         speechRecognizer.close();
//     });
// }

function fromMicrophone() {
    let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    speechRecognizer.recognizeOnceAsync(result => {
        switch (result.reason) {
            case sdk.ResultReason.RecognizedSpeech:
                console.log(`RECOGNIZED: Text=${result.text}`);
                break;
            case sdk.ResultReason.NoMatch:
                console.log("NOMATCH: Speech could not be recognized.");
                break;
            case sdk.ResultReason.Canceled:
                const cancellation = sdk.CancellationDetails.fromResult(result);
                console.log(`CANCELED: Reason=${cancellation.reason}`);

                if (cancellation.reason == sdk.CancellationReason.Error) {
                    console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                    console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                    console.log("CANCELED: Did you set the speech resource key and region values?");
                }
                break;
        }
        speechRecognizer.close();
    });
}

fromMicrophone();

// fromFile();
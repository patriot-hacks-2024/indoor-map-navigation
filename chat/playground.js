const { AzureOpenAI } = require("openai");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "<endpoint>";
const apiKey = process.env.AZURE_OPENAI_API_KEY || "<api key>";
const apiVersion = "2024-08-01-preview";
const deployment = "gpt-4o"; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.
require("dotenv/config");

async function main() {

    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
    const result = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
            { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI?" },
            { role: "user", content: "Do other Azure AI services support this too?" },
        ],
        model: "",
    });

    for (const choice of result.choices) {
        console.log(choice.message);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});

module.exports = { main };
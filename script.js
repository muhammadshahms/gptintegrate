import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

// Load environment variables from .env file
config();

// Create an instance of the OpenAIApi
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

// Create a user interface for reading input
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display initial prompt
userInterface.prompt();

// Event handler for user input
userInterface.on("line", async (input) => {
  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    });

    console.log(response.data.choices[0].message.content);

    // Introduce a delay before prompting again
    setTimeout(() => {
      userInterface.prompt();
    }, 1000); // Adjust the delay time (in milliseconds) as needed
  } catch (error) {
    console.error("Error:", error.message);
    userInterface.prompt();
  }
});

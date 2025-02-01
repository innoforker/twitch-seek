// The Unlicense

const prompt = require("prompt-sync")();
const channel = prompt(
  "Enter the name of the channel.\nKeep in mind that the live translation on this channel have to be started.\n\n"
);
const saveToFile = prompt(
  "Do you want to save the chat log to a file? (yes/no)\n"
);
const tmi = require("tmi.js");
const options = {
  channels: [channel],
};
const client = new tmi.Client(options);

console.log(`Tracking ${options["channels"][0]}...`);
client.on("message", (channel, userState, message, self) => {
  if (self) return;

  const timeStamp = new Date(
    parseInt(userState["tmi-sent-ts"])
  ).toLocaleString();
  const resultStr = `[${timeStamp}] ${userState.username}: ${message}`;
  if (saveToFile.toLowerCase() === "yes") {
    require("fs").appendFileSync(
      `src/logs/chat_log_${channel}.txt`,
      `${resultStr}\n`
    );
  }
  console.log(resultStr);
});

client.connect();

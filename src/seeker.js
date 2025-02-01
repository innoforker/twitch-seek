// The Unlicense

const prompt = require('prompt-sync')();
const channel = prompt('Enter the name of the channel.\nKeep in mind that the live translation on this channel have to be started.\n\n');

const tmi = require('tmi.js');
const options = {
    channels: [ channel ]
};
const client = new tmi.Client(options);

console.log(`Monitoring ${options['channels'][0]}...`)
client.on('message', (channel, userState, message, self) => {
    if (self) return;

    const timeStamp = new Date(parseInt(userState['tmi-sent-ts'])).toLocaleString();

    console.log(`[${timeStamp}] ${userState.username}: ${message}`);
});

client.connect();

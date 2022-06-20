const { Client } = require("discord.js")
const { SlashCommandsBuilder } = require("@discordjs/builders")

const client = new Client({
    intents: 131071,
    restTimeOffset: 0,
    allowedMentions: {
        everyone: false,
        users: true,
        roles: true
    },
    presence: {
        activity: {
            name: "with my code",
            type: "WATCHING"
        },
        status: "dnd",
    }
})
const { token } = require("./config.json");


client.once("ready", () => {
    console.log("Ready!");
});

const allSlashCommands = [];

const pingCommand = new SlashCommandsBuilder()
    .setName("ping")
    .setDescription("Ping command")

client.login(token);
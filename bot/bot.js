const { Client } = require("discord.js")
const client = new Client({
    intents: 131071
})
const { token } = require("./config.json");


require("./Handlers/Events")(client);

client.once("ready", () => {

});







client.login(token);
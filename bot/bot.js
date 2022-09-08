require('dotenv').config()
const chalk = require("chalk");
const systemStatus = require('./modules/sysinfo')
const { Client } = require("discord.js")
const client = new Client({
    intents: 3276799,
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




client.on("ready", () => {
    const log = console.log;
    console.log(`Logged in as ${client.user.tag}!`)
    systemStatus.systemInfo();
    log(chalk.green("All the systems are up and running!"));
})



client.login(process.env.token);
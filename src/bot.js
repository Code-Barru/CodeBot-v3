require('dotenv').config()

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');

const axios = require('axios');
axios.defaults.headers.get['X-Riot-Token'] = process.env.RIOT_API_TOKEN

const client = new Client({ intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites
]});

client.commands = new Collection();
client.commandArray = [];

const functionsFolders = fs.readdirSync("./src/functions")
for (const folder of functionsFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter(file => file.endsWith('.js'));
    for (const file of functionFiles) 
        require(`./functions/${folder}/${file}`) (client);
}

client.start();
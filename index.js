const {Client, Collection, Intents} = require("discord.js");
const config = require("./config.json");

const {loadCommands} = require("./commands.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});


if(!config.token) {
    console.log("Please add token to config.json");
    process.exit();
}

client.commands = new Collection();

loadCommands(client);

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    let messageArray = message.content.replace(/\s+/g,' ').trim().split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = client.commands.get(command.slice(config.prefix.length));
    if (!message.member.permissions.has(commandFile.userPermissions)) return message.channel.send("You don't have enought permissions.")
    if (commandFile) commandFile.run(client, message, args)
});

client.login(config.token);
const {Client, Collection, Intents} = require("discord.js");
const config = require("./config.json");
const reactionRoles = require("./reaction-roles.json")

const {loadCommands} = require("./commands.js");

if (!config.token) {
    console.log("Please add token to config.json");
    process.exit();
}

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Collection();

loadCommands(client);

client.on('messageCreate', (message) => {
    if(!message.content.startsWith(config.prefix) || message.author.bot) return;
    let messageArray = message.content.replace(/\s+/g,' ').trim().split(' ');
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandFile = client.commands.get(command.slice(config.prefix.length));
    if (!commandFile) return;
    if (!message.member.permissions.has(commandFile.userPermissions)) return message.channel.send("You don't have enough permissions.");
    commandFile.run(client, message, args)
});

if (reactionRoles) {
    client.on('messageReactionAdd', (reaction, user) => {
        let roleId = reactionRoles.roles[reaction.emoji.id] || reactionRoles.roles[reaction.emoji.name];
        if (roleId && reaction.message.id === reactionRoles.message_id) {
            reaction.message.guild.members.fetch(user)
                .then(member => member.roles.add(roleId));
        }
    });

    client.on('messageReactionRemove', (reaction, user) => {
        let roleId = reactionRoles.roles[reaction.emoji.id] || reactionRoles.roles[reaction.emoji.name];
        if (roleId && reaction.message.id === reactionRoles.message_id) {
            reaction.message.guild.members.fetch(user)
                .then(member => member.roles.remove(roleId));
        }
    });
}

client.login(config.token);
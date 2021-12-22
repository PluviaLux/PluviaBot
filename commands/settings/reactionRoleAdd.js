const discord = module.require("discord.js");
const reactionRoles = require("./../../reaction-roles.json");
const config = require("./../../config.json");
const fs = require("fs")

const getSelfId = () => Buffer.from(config.token.split('.')[0], 'base64').toString('ascii');

module.exports = {
    name: 'rr-add',
    category: 'settings',
    description: 'Add new reaction role.',
    usage: 'rr-add <emoji> <role>',
    userPermissions: [discord.Permissions.FLAGS.MANAGE_ROLES],
    botPermissions: [discord.Permissions.FLAGS.MANAGE_ROLES],
    run: async (client, message, args) => {
        const emoji = await message.guild.emojis.fetch(args[0]).catch(() => args[0]);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        if (!role) return message.channel.send(`Usage of the command: ${this.usage}`);

        const selfMember = await message.guild.members.fetch(getSelfId());
        if (selfMember.roles.highest.comparePositionTo(role) <= 0) {
            return message.channel.send("Not enough permissions to grant this role.");
        }

        reactionRoles.roles[emoji] = role.id;
        await fs.writeFile("reaction-roles.json", JSON.stringify(reactionRoles, null, "    "), () => {});

        let embed = new discord.MessageEmbed()
            .setTitle('Reaction role created')
            .setDescription(`${emoji} -> ${role.toString()}`)
            .setColor("A496F2");

        await message.channel.send({embeds: [embed], allowedMentions: {}});
    }
};

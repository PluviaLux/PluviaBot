const discord = module.require("discord.js");
const reactionRoles = require("./../../reaction-roles.json");
const fs = require("fs");

module.exports = {
    name: 'rr-remove',
    category: 'settings',
    description: 'Remove reaction role.',
    userPermissions: [discord.Permissions.FLAGS.MANAGE_ROLES],
    botPermissions: [discord.Permissions.FLAGS.MANAGE_ROLES],
    run: async (client, message, args) => {
        const emoji = args[0];
        delete reactionRoles.roles[emoji];

        await fs.writeFile("reaction-roles.json", JSON.stringify(reactionRoles, null, "    "), () => {});

        let embed = new discord.MessageEmbed()
            .setTitle('Reaction role removed')
            .setDescription(`Removed ${emoji}`)
            .setColor("A496F2");

        await message.channel.send({embeds: [embed], allowedMentions: {}});
    }
};

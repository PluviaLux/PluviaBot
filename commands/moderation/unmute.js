const discord = module.require("discord.js");

module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Removes timeout from an user',
    usage: 'unmute <@user>',
    userPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    botPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.users.cache.get(args[0]);

        let embed = new discord.MessageEmbed()
            .setTitle('Timeout user')
            .setDescription(`${target} (id ${target.id}) unmuted by ${message.author}`)
            .setColor("F24D11")
            .setThumbnail(target.displayAvatarURL());
        await target.timeout(null).then(() => message.channel.send({embeds: [embed]}));
    }
};

const discord = module.require("discord.js");

module.exports = {
    name: 'unmute',
    category: 'moderation',
    description: 'Removes timeout from an user',
    usage: 'unmute <@user>',
    userPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    botPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    run: async (client, message, args) => {
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!target) return message.channel.send(`Usage of the command: ${this.usage}`);

        let embed = new discord.MessageEmbed()
            .setTitle('Timeout user')
            .setDescription(`${target} (id ${target.id}) unmuted by ${message.author}`)
            .setColor("F24D11")
            .setThumbnail(target.displayAvatarURL());
        await target.timeout(null).then(() => message.channel.send({embeds: [embed]})).catch(() => message.channel.send("An error occurred, cannot remove tumeout user. Make sure that bot have enough permissions."));
    }
};

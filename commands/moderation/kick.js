const discord = module.require("discord.js");

module.exports = {
    name: 'kick',
    category: 'moderation',
    description: 'Kick an user from guild',
    usage: 'kick <@user> <reason>',
    userPermissions: [discord.Permissions.FLAGS.KICK_MEMBERS],
    botPermissions: [discord.Permissions.FLAGS.KICK_MEMBERS],
    run: async (client, message, args) => {
        let reason = args.slice(1).join(" ") || "Reason unspecified.";

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) return message.channel.send(`Usage of the command: ${this.usage}`);

        if (target.id === message.author.id) return message.channel.send(`Nah, you tried to kick yourself.`);
        if (target.id === message.guild.ownerId) return message.channel.send(`You cannot kick server owner.`);

        let embed = new discord.MessageEmbed()
            .setTitle('Kicked user')
            .setDescription(`${target} (id ${target.id}) kicked by ${message.author}`)
            .addField("Reason:", reason)
            .setColor("F24D11")
            .setThumbnail(target.displayAvatarURL());
        await target.kick(reason).then(() => message.channel.send({embeds: [embed]})).catch(() => message.channel.send("An error occurred, cannot kick user. Make sure that bot have enough permissions."));
    }
};

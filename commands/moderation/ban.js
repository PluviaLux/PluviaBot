const discord = module.require("discord.js");

module.exports = {
    name: 'ban',
    category: 'moderation',
    description: 'Ban an user',
    usage: 'ban <@user> <reason>',
    userPermissions: [discord.Permissions.FLAGS.BAN_MEMBERS],
    botPermissions: [discord.Permissions.FLAGS.BAN_MEMBERS],
    run: async (client, message, args) => {
        let reason = args.slice(1).join(" ") || "Reason unspecified.";

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!target) return message.channel.send(`Usage of the command: ${this.usage}`);

        if (target.id === message.author.id) return message.channel.send(`Nah, you tried to ban yourself.`);
        if (target.id === message.guild.ownerId) return message.channel.send(`You cannot ban server owner.`);

        let embed = new discord.MessageEmbed()
            .setTitle('Banned user')
            .setDescription(`${target} (id ${target.id}) banned by ${message.author}`)
            .addField("Reason:", reason)
            .setColor("F24D11")
            .setThumbnail(target.displayAvatarURL());
        await message.guild.bans.create(target, {reason: reason}).then(() => message.channel.send({embeds: [embed]})).catch(() => message.channel.send("An error occurred, cannot ban user. Make sure that bot have enough permissions."));
    }
};

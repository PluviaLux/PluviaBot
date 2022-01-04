const discord = module.require("discord.js");

module.exports = {
    name: 'mute',
    category: 'moderation',
    description: 'Timeout an user',
    usage: 'mute <@user> <time> <reason>',
    userPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    botPermissions: [discord.Permissions.FLAGS.MODERATE_MEMBERS],
    run: async (client, message, args) => {
        let reason = args.slice(2).join(" ") || "Reason unspecified.";
        
        if (args[1].match(/\d+(s|sec|second|seconds)/)) amount = 1000;
        else if (args[1].match(/\d+(m|min|minute|minutes)/)) amount = 60 * 1000;
        else if (args[1].match(/\d+(d|day|days)/)) amount = 24 * 60 * 60 * 1000;
        else amount = 60 * 60 * 1000;

        amount *= parseInt(args[1]) || 1;

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (target.id === message.author.id) return message.channel.send(`Mute yourself?`);
        if (target.id === message.guild.ownerId) return message.channel.send(`You can't mute server owner.`);

        let embed = new discord.MessageEmbed()
            .setTitle('Timeout user')
            .setDescription(`${target} (id ${target.id}) muted by ${message.author}`)
            .addField("Reason:", reason)
            .addField("Until:", `<t:${Math.round((Date.now() + amount) / 1000)}>`)
            .setColor("F24D11")
            .setThumbnail(target.displayAvatarURL());
        await target.timeout(amount, reason).then(() => message.channel.send({embeds: [embed]}));
    }
};

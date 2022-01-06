const discord = module.require("discord.js");

module.exports = {
    name: 'avatar',
    category: 'utility',
    description: 'Sends user avatar to this chat',
    usage: 'avatar <@user>',
    userPermissions: [],
    botPermissions: [],
    run: async (client, message, args) => {
        const target = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]);

        if(!target) return message.channel.send(`Usage of the command: ${this.usage}`);

        let embed = new discord.MessageEmbed()
            .setTitle(`${target.displayName}'s avatar`)
            .setImage(target.displayAvatarURL());
        await message.channel.send({embeds: [embed]});
    }
};

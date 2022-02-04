const { MessageEmbed, GuildMember } = require("discord.js");

module.exports = {
    name: 'whois',
    description: 'Shows someones info',
    async execute(message, args){
        const member = message.mentions.users.first();
        const d = new Date();
        if(!message.mentions.users.first()) return message.reply('Specify a member')
        displayName = member.displayName
        if(member.displayName === undefined) displayName = 'None'
        const embed = new MessageEmbed()
        .setAuthor({name: `${member.username}${member.discriminator}`, iconURL: member.displayAvatarURL()})
        .setDescription(`**Name**: ${member.username}
                        **Discriminator**: #${member.discriminator}
                        **Nickname**: ${displayName}
                        **Created At**: ${member.createdAt}`)
        .setColor('BLURPLE')
        .setThumbnail(member.displayAvatarURL())
        .setFooter({text: `ID: ${member.id}`})
        .setTimestamp([4200, 10, 30])
        
        message.channel.send({embeds: [embed]})
        
    }
}
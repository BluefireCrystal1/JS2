const { MessageEmbed, User } = require('discord.js')
const helpList = require('./json/help.json')

module.exports = {
    name: 'serverstats',
    description: helpList.serverstats.value,
    async execute(message, args, client) {
        const ownerOfServer = client.users.cache.find(user => user.id === message.guild.ownerId)
        
        const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Info`)
        .addFields(
            {name: 'Server name', value: `${message.guild.name}`, inline:true},
            {name: 'Server Owner', value: `${ownerOfServer.username}`, inline:true},
            {name: 'Members', value: `${message.guild.memberCount}`, inline:true},
            {name: 'Channels', value: `${message.guild.channels.size}`, inline:true},
            {name: 'Roles', value: `${message.guild.roles.size}`, inline:true}
        )
        .setTimestamp(message.guild.createdTimestamp)
        .setThumbnail(message.guild.iconURL())
        .setFooter({text: `ID: ${message.guild.id}`})
        .setColor('BLUE')
        message.channel.send({embeds: [embed]})
    }
}
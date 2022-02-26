const { MessageEmbed } = require('discord.js')
const helpList = require('./json/help.json')

module.exports = {
    name: 'rr',
    description: helpList.rr.value,
    async execute(message, args, client) {
    if(message.member.permissions.has('ADMINISTRATOR')) {
        const channel = '947046639883943987'
        const announcementPingEmoji = '📢'
        const newsPingEmoji = '📰'
        const botTesterEmoji = '🤖'

        const embed = new MessageEmbed()
        .setTitle('React to one of the reactions to get a role!')
        .setDescription(`${announcementPingEmoji} for Announcement Ping
                         ----------------------------------------------
                         ${newsPingEmoji} for News Ping
                         ----------------------------------------------
                         ${botTesterEmoji} for Bot Tester`)
        .setColor('#e42643')
        .setThumbnail('https://i.imgur.com/q4BXUJ9.png')

        let send = await message.channel.send({embeds: [embed]});
        send.react(announcementPingEmoji)
        send.react(newsPingEmoji)
        send.react(botTesterEmoji)

        
    }else{
        message.channel.send('You cannot access reaction roles command!')
    }
    }
}
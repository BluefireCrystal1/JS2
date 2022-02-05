const { MessageEmbed } = require('discord.js')
const helpList = require('./json/help.json')

module.exports = {
    name: 'rr',
    description: helpList.rr.value,
    async execute(message, args, client) {
    if(message.member.permissions.has('ADMINISTRATOR')) {
        const channel = '936873263768932372'
        const announcementPingRole = message.guild.roles.cache.find(role => role.name === 'Announcement Ping')
        const newsPingRole = message.guild.roles.cache.find(role => role.name === 'News Ping')

        const announcementPingEmoji = '📢'
        const newsPingEmoji = '📰'

        const embed = new MessageEmbed()
        .setTitle('React to one of the reactions to get a role!')
        .setDescription(`${announcementPingEmoji} for Announcement Ping\n
                         ${newsPingEmoji} for News Ping`)
        .setColor('#e42643')

        let send = await message.channel.send({embeds: [embed]});
        send.react(announcementPingEmoji)
        send.react(newsPingEmoji)

        client.on('messageReactionAdd', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === announcementPingEmoji) {// dont change anything here
                    await reaction.message.guild.members.cache.get(user.id).roles.add(announcementPingRole);
                }
                if(reaction.emoji.name === newsPingEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(newsPingRole);
                }
            }else {
                return
            }
        });

        client.on('messageReactionRemove', async (reaction, user) => {
            if(reaction.message.partial) await reaction.message.fetch();
            if(reaction.partial) await reaction.fetch();
            if(user.bot) return;
            if(!reaction.message.guild) return;
            if(reaction.message.channel.id == channel) {
                if(reaction.emoji.name === announcementPingEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(announcementPingRole);
                }
                if(reaction.emoji.name === newsPingEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(newsPingRole);
                }
            }else {
                return
            }
        });
    }else{
        message.channel.send('You cannot access reaction roles command!')
    }
    }
}
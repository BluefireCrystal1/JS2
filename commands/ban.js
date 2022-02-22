const { MessageEmbed } = require("discord.js");
const helpList = require('./json/help.json')

module.exports = {
    name: 'ban',
    description: helpList.ban.value,
    execute(message, args, client){

            const member = message.mentions.users.first();
        if(message.member.permissions.has('BAN_MEMBERS')){
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id)
                const bannedEmbed = new MessageEmbed()
                .setTitle('Ban')
                .setDescription(`Successfully Banned ${memberTarget.displayName}`)
                .setColor("#FFA626")
                message.channel.send({embeds: [bannedEmbed]})
                memberTarget.ban();
            }else{
                message.channel.send("Something went wrong (You didnt specify a member/Or the member is higher than me)");
            }
            try {

            }catch(err) {
                message.channel.send("Something went wrong (You didnt specify a member/You tried to ban me)");
            }
        }else{
            return message.reply('You do not have enough permissions')
        }
    }
}
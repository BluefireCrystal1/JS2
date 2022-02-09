const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const helpList = require('./json/help.json')

module.exports = {
    name: 'ping',
    description: helpList.ping.value,
    execute(message, args){
        message.reply(`Calculating Ping....`).then(async rslt =>{
            const ping = rslt.createdTimestamp - message.createdTimestamp

            await rslt.edit(`Calculating Ping...`)
            await rslt.edit(`Calculating Ping..`)
            await rslt.edit(`Calculating Ping.`)
            await rslt.delete()
            const embed = new MessageEmbed()
            .setTitle('Pong 🏓')
            .setDescription(`🟢 \`${ping/10}\` ms `)
            .setColor('GREEN')
            const embed2 = new MessageEmbed()
            .setTitle('Pong 🏓')
            .setDescription(`🔴 \`${ping/10}\` ms `)
            .setColor('RED')
            if(ping/10 > 50){
            message.channel.send({content: ' ', embeds: [embed2]})
            }
            if(ping/10 < 50){
            message.channel.send({content: ' ', embeds: [embed]})
                }
        })



    }
}
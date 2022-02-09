const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const helpList = require('./json/help.json')

module.exports = {
    name: 'ping',
    description: helpList.ping.value,
    execute(message, args){
        message.reply(`Calculating Ping....`).then(async rslt =>{
            const ping = Math.round(client.ws.ping)

            await rslt.edit(`Calculating Ping...`)
            await rslt.edit(`Calculating Ping..`)
            await rslt.edit(`Calculating Ping.`)
            await rslt.delete()
            const embed = new MessageEmbed()
            .setTitle('Pong 🏓')
            .setDescription(`🟢 \`Api Latency : ${ping}\` ms `)
            .setColor('GREEN')
            const embed2 = new MessageEmbed()
            .setTitle('Pong 🏓')
            .setDescription(`🔴 \`Api Latency : ${ping}\` ms `)
            .setColor('RED')
            if(ping > 50){
            message.channel.send({content: ' ', embeds: [embed2]})
            }
            if(ping < 50){
            message.channel.send({content: ' ', embeds: [embed]})
            console.log(ping)
                }
        })



    }
}
const { MessageEmbed } = require("discord.js")
const helpList = require('./json/help.json')

function filter(message) {
  const badwords = ['fuck', 'fuc','motherfucker', 'bitch', 'dick', 'clitoris', 'anal', 'mf', 'dickhead', 'asshole','fok', 'f u c k', 'anus', 'f o k', 'b i t c h', 'b!tch', 'btch']
  badwords.forEach(element => {
  message = message.replace(element, '---');})
  return message

}

module.exports = {
    name: 'say',
    description: helpList.say.value,
    execute(message, ...args) {
    const length = message.content.length
    const commandLength = 5
    if(length>500 || length<=commandLength) return message.channel.send('Error: You either didn\'t specify something to send or your message is over 500 characters');
    let sliced = message.content.slice(commandLength,length)
    sliced = filter(sliced)
    const sayEmbed = new MessageEmbed()
    .setAuthor({name: message.member.displayName, iconURL: message.member.displayAvatarURL()})
    .setDescription(sliced)
    .setColor('RED')
    .setTimestamp()
    message.delete()
    
    message.channel.send({embeds: [sayEmbed]})
    }
}


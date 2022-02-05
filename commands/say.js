const { MessageEmbed } = require("discord.js")
const helpList = require('./json/help.json')
const badword = require('./json/bad_words.json')

function filter(message) {
  const badwords= badword.badwords;
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


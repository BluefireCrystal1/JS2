const { MessageEmbed } = require("discord.js")
const helpList = require('./json/help.json')
function getHelpElements(embed,filter) {
    let i = 0
    for (const x in helpList) { 
        if (Object.hasOwnProperty.call(helpList, x)) {
            const element = helpList[x];
            try{
              if(element.section === filter || filter === ""){
                embed.addFields(element)
                i+=1
              }
            }
            catch(err){
              console.log("1 skipped: ")
            }
        }
        
    }
    if (i===0){
      let categories = ""
      object = helpList.categories
      for (const property in object) {
        categories += object[property]+", "
      }

      return embed.setDescription("No such category found categories are: " + categories)
    }
}
module.exports = {
    
    name: 'help',
    description: helpList.help.value,
    execute(message, args) {
        // x = getHelpElements()
        const commandLength = 6
        const embed = new MessageEmbed()
            .setTitle('Commands')
            .setColor('#26FFD1')
            // .addFields(helpList.credits)
            .setTimestamp()
            .setFooter({ text: `Requested by ${message.member.displayName}`, iconURL: message.member.displayAvatarURL() })
        let filter = message.content.slice(commandLength, message.length)
        getHelpElements(embed,filter)
        message.reply({ embeds: [embed] })
        chance = 2
        i = Math.floor(Math.random() * 1000)
        if (i < chance) {
            reply = "Join our server! https://discord.gg/FuQtKHgzSp"; return message.channel.send(reply)
        }

        onHelpUse();
    }

}
async function onHelpUse(message) {
    console.log('Help command used')

}







                // getHelpElements()
                // { name: '\`?ban @mentionsomeone\`', value: 'Bans a member', inline: true },
                // { name: '\`?unban @mentionsomeone\`', value: 'Unbans a member', inline: true },
                // { name: '\`?purge (limit 100)\`', value: 'Deletes a specified amount of messages', inline: true },
                // { name: '\`?help\`', value: 'Shows all the commands', inline: true },
                // { name: '\`?kick @mentionSomeone\`', value: 'Kicks a member', inline: true },
                // { name: '\`?ping\`', value: 'Shows the ping of the bot', inline: true },
                // { name: '\`?thread name\`', value: 'Creates a thread for help', inline: true },
                // { name: '\`?say {message}\`', value: 'Says something for you', inline: true },
                // { name: '\`?credits\`', value: '**Shows who contributed to the Bot**', inline: false },
                // { name: '\`?joke\`', value: '**Shows a random joke**', inline: false },
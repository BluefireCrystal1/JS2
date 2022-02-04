const { MessageEmbed } = require("discord.js")
const helpList = require('./json/help.json')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'credits',
    description: helpList.credits.value,
    execute(message, ...args) {
        const embed = new MessageEmbed()
            .setAuthor({ name: 'Bluefire, Beluga' })
            .setTitle("Credits")
            .setDescription('This bot is made by **BluefireCrystal#0852** & **Beluga#0099**')
            .setColor('BLUE')
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('Bluefire')
                .setLabel('Bluefire')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId('Beluga')
                .setLabel('Beluga')
                .setStyle('PRIMARY'),
            
        )
        // const row2 = new MessageActionRow()
        // )
        message.channel.send({ephemeral: true,embeds: [embed], components: [row]})
    }
}


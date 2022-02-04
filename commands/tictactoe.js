const { MessageEmbed, GuildMember } = require("discord.js");
const helpList = require('./json/help.json')
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'ttt',
    description: helpList.ttt.value,
    async execute(message, args) {
        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('a1')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('b1')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('c1')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),

            )
        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('a2')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('b2')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('c2')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),

            )
        const row3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('a3')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('b3')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('c3')
                    .setLabel('   ')
                    .setStyle('SECONDARY'),

            )
        const member = message.mentions.users.first();
        message.channel.send({ content: "Tic Tac Toe!", components: [row1, row2, row3] })
    }
}
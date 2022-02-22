const { MessageActionRow } = require('discord.js');
const row1 = require('./commands/ttt.js')
const row2 = require('./commands/ttt.js')
const row3 = require('./commands/ttt.js')
const wait = require('util').promisify(setTimeout);
async function Buttons(interaction) {
    if (interaction.customId === 'Contact') {
        interaction.channel.send({ content: 'Message us on our server: https://discord.gg/up4MbsHzz5' })
        await interaction.update({ components: [] })
    }
    //--------------- TICTACTOE
    //---- 1
    if (interaction.customId === 'a1') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'a1', components: [
                row1.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'b1') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'b1', components: [
                row1.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'c1') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'c1', components: [
                row1.setComponents(interaction.component)
            ]
        })
    }
    //---- 2
    if (interaction.customId === 'a2') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'a2', components: [
                row2.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'b2') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'b2', components: [
                row2.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'c2') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'c2', components: [
                row2.setComponents(interaction.component)
            ]
        })
    }
    //---- 3
    if (interaction.customId === 'a3') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'a3', components: [
                row3.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'b3') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'b3', components: [
                row3.setComponents(interaction.component)
            ]
        })
    }
    if (interaction.customId === 'c3') {
        interaction.component.setStyle('DANGER')
        interaction.update({
            content: 'c3', components: [
                row3.setComponents(interaction.component)
            ]
        })
    }
    //---------------
}
module.exports = { Buttons }
const row = require('./commands/credits.js')
const wait = require('util').promisify(setTimeout);
async function CreditButton(interaction) {
    if (interaction.customId === 'Contact') {
        interaction.update({ content: '**BluefireCrystal#0852** & **Beluga#0099**' })
        interaction.channel.send({ content: 'Message us on our server: \`https://discord.gg/FuQtKHgzSp\`' })
    }
}
    // await collector.on('collect', i => {
    //     if (i.user.id === interaction.user.id) {
    //         i.reply(`${i.user.id} clicked on this button.`)
    //     } else {
    //         i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    //     }
    // }
    // )



// if (interaction.customId === 'a1') {
//     interaction.channel.send({ content: 'Pressed a1' })
// }
module.exports = { CreditButton }
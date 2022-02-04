const row = require('./commands/credits.js')
const wait = require('util').promisify(setTimeout);
async function CreditButton(interaction) {
    if (interaction.customId === 'Contact') {
        interaction.update({ content: '**BluefireCrystal#0852** & **Beluga#0099**' })
        interaction.channel.send({ content: 'Message us on our server: \`https://discord.gg/FuQtKHgzSp\`' })
    }
}
async function tictactoeCheck(interaction) {
    const filter = i => i.customId === 'a1';
    const collector = interaction.message.createMessageComponentCollector({ filter, time: 15000 })
    collector.on('collect', async i => {
        console.log(i)
        if (i.user.id === interaction.user.id) {
            await i.deferUpdate();
            await wait(4000);
            await i.editReply({ content: 'A button was clicked!', components: [] });
        }
        console.log('Ate 2 muffins and killed your mom')
    })
    collector.on('end', collected => console.log(`Collected`));

    // await collector.on('collect', i => {
    //     if (i.user.id === interaction.user.id) {
    //         i.reply(`${i.user.id} clicked on this button.`)
    //     } else {
    //         i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
    //     }
    // }
    // )


};


// if (interaction.customId === 'a1') {
//     interaction.channel.send({ content: 'Pressed a1' })
// }
module.exports = { CreditButton, tictactoeCheck }
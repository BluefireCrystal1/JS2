const row = require('./commands/credits.js')
const wait = require('util').promisify(setTimeout);
async function CreditButton(interaction) {
    if (interaction.customId === 'Contact') {
        interaction.channel.send({ content: 'Message us on our server: \`https://discord.gg/FuQtKHgzSp\`' })
        await interaction.update({ components:[]})
    }
}
module.exports = { CreditButton }
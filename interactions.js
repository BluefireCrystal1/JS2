const row = require('./commands/credits.js')

async function CreditButton(interaction){
    // console.log(interaction) //i too i want to fix errror dont erase plz
    if (interaction.customId === 'Contact') {
        interaction.update({content:'**BluefireCrystal#0852** & **Beluga#0099**'})
        interaction.channel.send({content: 'Also join our server: \`https://discord.gg/FuQtKHgzSp\`'})
        console.log()
    }
    // const filter = i => i.customId === 'Beluga';

    // const collector = interaction.channel.createMessageComponentCollector({ filter, time: 3000 });
    
    // collector.on('collect', async i => {
    //    if (interation.customId === 'Contact') {
    //         await i.update({ content: 'A button was clicked!', components: [] });
    //     }
    // });// even wiith one button
    // //Dont add another one it is crashing when u press a button then do again the same vn
    // collector.on('end', collected => console.log(`Collected ${collected.size} items`));
}
module.exports = {CreditButton}
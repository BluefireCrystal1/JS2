const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const chnlId = '936988777329610762';
const helpList = require('./json/help.json')

module.exports = {
    name: 'thread',
    description: helpList.thread.value,
    async execute(message, ...args){
        if(message.channel.id === chnlId){
        message.reply(`Creating....`).then(async rslt =>{
            const ping = rslt.createdTimestamp - message.createdTimestamp

            await rslt.edit(`Creating...`)
            await rslt.edit(`Creating..`)
            await rslt.edit(`Creating.`)
            
            
            const thread = await message.channel.threads.create({
                
                name: message.content.replace("?thread", '').replace("?Thread", '').replace("?THREAD", ''),
                autoArchiveDuration: 1440,
                reason: '-',
            });
            
            await thread.members.add('815121233057808424');
            await thread.members.add('902922671589830686');
            await thread.members.add('880313471206588428');
            console.log(`Created thread: ${thread.name}`);
            await rslt.edit(`Done!`)
            await rslt.delete()
            await thread.send(`${message.member.displayName} Needs help with: ${message.content.replace("?thread", '').replace("?Thread", '').replace("?THREAD", '')}`)
            await thread.send(`Here are some important things you need to know with help threads: \n 1) Do not ping everyone or anyone in the thread because they already get pinged. \n 2) Wait for their response, have patience`)
        })

        }else {
            return
        }
    }
}

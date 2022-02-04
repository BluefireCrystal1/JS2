const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const chnlId = '936988777329610762';
const helpList = require('./json/help.json')

module.exports = {
    name: 'thread',
    description: helpList.thread.value,
    async execute(message, ...args){

        if(message.channel.id!=chnlId) return message.channel.send(
            `The thread feature is only for help with bot code, goto <#${chnlId}> to create a thread`)
        message.reply(`Creating....`).then(async rslt =>{
            
            const members = ['815121233057808424','902922671589830686','880313471206588428'];
            const ping = rslt.createdTimestamp - message.createdTimestamp
            const commandLength = 7
            await rslt.edit(`Creating...`)
            await rslt.edit(`Creating..`)
            await rslt.edit(`Creating.`)
            const threadName = message.content.slice(commandLength,message.length) 
            
            const thread = await message.channel.threads.create({
                
                name: threadName,
                autoArchiveDuration: 1440,
                reason: 'Someone asked for help',
            });
            members.forEach(async element => { 
                await thread.members.add(element);
            });console.log(`Created thread: ${thread.name}`);
            await rslt.edit(`Done!`)
            await rslt.delete()
            await thread.send(`${message.member.displayName} Needs help with: ${threadName}`)
            await thread.send(`Here are some important things you need to know with help threads: 
            \n 1) Do not ping everyone or anyone in the thread because they already get pinged. 
            \n 2) Wait for their response, have patience`)
        })
    }
}
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const chnlId = '936988777329610762';
const helpList = require('./json/help.json')
const easterEgg  = require('./easteregg.js')

async function deleteThread(message) {
    reply = easterEgg.chanceRoll(5,"This is not a thread", "I dont think this is a thread, you need to get your eyes operated.")

    if(!message.channel.isThread()) return message.reply(reply)
    let thread = message.channel;    
    message.reply(`Deleting....`).then(async rslt =>{
        thread.setName("Solved| "+thread.name)
        await rslt.edit(`Deleting...`)
        await rslt.edit(`Deleting..`)
        await rslt.edit(`Deleting.`)
        await thread.delete()
    })
}

async function solvedThread(message) {
    // if(!message.channel.isThread()) return message.reply("This is not a thread please have an appointment with the nearest eye clinic. Thanks for using our bot feature.")
    reply = easterEgg.chanceRoll(5,"This is not a thread", "I dont think this is a thread, you need to get your eyes operated.")
    
    if(!message.channel.isThread()) return message.reply(reply)
    let thread = message.channel;    
    message.reply(`Solved: ${thread.name}`).then(async rslt =>{
        thread = message.channel;
        console.log(thread)       
        // thread.setName("Solved| "+thread.name)
        await thread.setLocked(true);
        await thread.setArchived(true);
        
        
    })
}
module.exports = {
    name: 'thread',
    description: helpList.thread.value,
    async execute(message, ...args){
        const commandLength = 8
        const content = message.content.slice(commandLength,message.length)
        console.log(content)
        if (content === "delete") return deleteThread(message) 
        if (content === "solved") return solvedThread(message) 
        if(message.channel.id!=chnlId) return message.channel.send(
            `The thread feature is only for help with bot code, goto <#${chnlId}> to create a thread`)
        message.reply(`Creating....`).then(async rslt =>{
            
            await rslt.edit(`Creating...`)
            const members = ['815121233057808424','902922671589830686','880313471206588428'];
            await rslt.edit(`Creating..`)
            const ping = rslt.createdTimestamp - message.createdTimestamp
            await rslt.edit(`Creating.`)
            
            const thread = await message.channel.threads.create({
                
                name: content,
                autoArchiveDuration: 1440,
                reason: 'Someone asked for help',
            });
            members.forEach(async element => { 
                await thread.members.add(element);
            });console.log(`Created thread: ${thread.name}`);
            await rslt.edit(`Done!`)
            await rslt.delete()
            await thread.send(`${message.member.displayName} Needs help with: ${content}`)
            await thread.send(`Here are some important things you need to know with help threads: 
            \n 1) Do not ping everyone or anyone in the thread because they already get pinged. 
            \n 2) Wait for their response, have patience`)
        })
    }
}
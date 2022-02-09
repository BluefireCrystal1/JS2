const { Client, Intents, Collection, MessageEmbed, GuildMember } = require('discord.js');
const intJ = require('./interactions.js')
const mongoose = require('mongoose')
const row = require('./commands/credits.js')
const profileModel = require('./models/profileSchema')
// const { token, mongoUrl } = require('./config.json')
const profanities = require('./commands/json/bad_words.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs');
const { EventEmitter } = require('stream');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commands = require(`./commands/${file}`);

    client.commands.set(commands.name, commands);
}

const prefix = "?"

client.once('ready', async () => {
    mongoose.connect(process.env.mongoUrl,
        {
            keepAlive: true
        }).then(console.log("DB connected!!"));
    console.log('Connected!')
    client.user.setPresence({
        status: 'dnd'
    })
    client.user.setActivity(`${prefix}help`, { type: 'PLAYING', url: 'https://i.imgur.com/SvQ0PxX.png' });

});

client.on('guildCreate', guild => {
    const channel = guild.channels.cache.find(channel => channel.isText() && channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
    const embed = new MessageEmbed()
        .setTitle('Thanks for inviting me!')
        .setDescription(`Hello! My name is BlueKit, Thanks for choosing me, I am made by BluefireCrystal & Beluga! The prefix is \`?\``)
        .setColor("#2682FF")
    channel.send({ embeds: [embed] })

});

client.on('guildMemberAdd', async member => {
    console.log("Someone joined")
    const welcomeEmbed = new MessageEmbed()
        .setTitle('Welcome!')
        .setDescription(`Welcome **${member.displayName}** our server! Follow the ` + member.guild.channels.cache.get('936495957531566080').toString() + ` and have a nice day!`)
        .setColor("#2682FF")
    const userRole = member.guild.roles.cache.find(role => role.name === 'User')
    await member.guild.channels.cache.get('932985164718538752').send({ embeds: [welcomeEmbed] })
    await member.roles.add(userRole)
    let profileData = await profileModel.findOne({ userId: member.id })
    // console.log(profileData)// run again and rejoin 
    if (!profileData) {
        let profile = await profileModel.create({
            userId: member.id,
            messages: 0,
            level: 0,
            xp: 0,
        })//whot nexx
        // console.log(profile)
        profile.save()
    }
})


client.on('messageCreate', async message => {
    let profileData = await profileModel.findOne({ userId: message.author.id })
    if (!profileData) {
        console.log("profile data created")
        let profile = await profileModel.create({
            userId: message.author.id,
            messages: 0,
            level: 0,
            xp: 0,
        })
        // console.log(profile)
        profile.save()
    } else {
        console.log("was here")
        await profileData.update({
            $inc: {
                messages: 1
            }
        })
        await profileData.save()
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }
    if (command === 'purge') {
        client.commands.get('purge').execute(message, args);
    }
    if (command === 'ban') {
        client.commands.get('ban').execute(message, args);
    }
    if (command === 'kick') {
        client.commands.get('kick').execute(message, args);
    }
    if (command === 'unban') {
        client.commands.get('unban').execute(message, args);
    }
    if (command === 'help') {
        client.commands.get('help').execute(message, args);
    }
    if (command === 'thread') {
        client.commands.get('thread').execute(message, args);
    }
    if (command === 'say') {
        client.commands.get('say').execute(message, args);
    }
    if (command === 'credits') {
        client.commands.get('credits').execute(message, args);
    }
    if (command === 'joke') {
        client.commands.get('joke').execute(message, args);
    }
    if (command === 'roast') {
        client.commands.get('roast').execute(message, args);
    }
    if (command === 'meme') {
        client.commands.get('meme').execute(message, args);
    }
    if (command === 'cat') {
        client.commands.get('cat').execute(message, args);
    }
    if (command === 'whois' || command === 'who') {
        client.commands.get('whois').execute(message, args);
    }
    if (command === 'reactionrole' || command === 'rr') {
        client.commands.get('rr').execute(message, args, client);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    const channel = '936873263768932372'
    const announcementPingRole = reaction.message.guild.roles.cache.find(role => role.name === 'Announcement Ping')
    const newsPingRole = reaction.message.guild.roles.cache.find(role => role.name === 'News Ping')
    const botTesterRole = reaction.message.guild.roles.cache.find(role => role.name === 'Bot Testers.')

    const announcementPingEmoji = '📢'
    const newsPingEmoji = '📰'
    const botTesterEmoji = '🤖'

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === announcementPingEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(announcementPingRole);
        }
        if (reaction.emoji.name === newsPingEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(newsPingRole);
        }
        if (reaction.emoji.name === botTesterEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(botTesterRole);
        }
    } else {
        return
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    const announcementPingRole = reaction.message.guild.roles.cache.find(role => role.name === 'Announcement Ping')
    const newsPingRole = reaction.message.guild.roles.cache.find(role => role.name === 'News Ping')
    const botTesterRole = reaction.message.guild.roles.cache.find(role => role.name === 'Bot Testers.')
    const announcementPingEmoji = '📢'
    const newsPingEmoji = '📰'
    const botTesterEmoji = '🤖'
    const channel = '936873263768932372'
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === announcementPingEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(announcementPingRole);
        }
        if (reaction.emoji.name === newsPingEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(newsPingRole);
        }
        if (reaction.emoji.name === botTesterEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(botTesterRole);
        }
    } else {
        return
    }
});

client.on('messageDelete', async (message) => {
    guild = client.guilds.cache.get('932477320458010664')
    if (message === guild) {
        deldMsgsChnl = client.channels.cache.get('933317900788441148')
        const e = new MessageEmbed()
            .setTitle(`Message Deleted!`)
            .setDescription(message.content)
            .setColor('#26F6F9')
            .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
            .setTimestamp()
        await deldMsgsChnl.send({ embeds: [e] })
    } else {
        return;
    }
});

client.on('messageUpdate', (message, newMessage) => {
    deldMsgsChnl = client.channels.cache.get('933317900788441148')
    const e = new MessageEmbed()
        .setTitle(`Message Edited!`)
        .setDescription(`:rewind: **Old Message**: ${message.content}
                     :fast_forward: **New Message**: ${newMessage.content}`)
        .setColor('#26F6F9')
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() })
        .setTimestamp(message.editedAt)
    deldMsgsChnl.send({ embeds: [e] })
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    intJ.CreditButton(interaction)
});

client.login(process.env.TOKEN);
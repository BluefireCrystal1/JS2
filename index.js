const { Client, Intents, Collection, MessageEmbed, GuildMember, MessageAttachment, Message } = require('discord.js');
const intJ = require('./interactions.js')
const mongoose = require('mongoose')
const row = require('./commands/credits.js')
const profileModel = require('./models/profileSchema')
// const { token, mongoUrl } = require('./config.json')
const client = new Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const fs = require('fs');
const Canvas = require('canvas')
require('dotenv').config()
Canvas.registerFont('./Insanibc.ttf', { family: 'customFont' })
const canvacord = require("canvacord");
const talkedRecently = new Set();

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commands = require(`./commands/${file}`);

    client.commands.set(commands.name, commands);
}

const prefix = "?" || `<@!${client.user.id}>`

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
const applyText = (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px "customFont"`;
    } while (context.measureText(text).width > canvas.width - 300);

    return context.font;
};


client.on('guildMemberAdd', async member => {

    const welcomeEmbed = new MessageEmbed()
        .setTitle('Welcome!')
        .setDescription(`Welcome **${member.displayName}** our server! Follow the ` + member.guild.channels.cache.get('947046718963351562').toString() + ` and have a nice day!`)
        .setColor("#2682FF")
    const userRole = member.guild.roles.cache.find(role => role.name === 'User')
    const general = await member.guild.channels.cache.get('947046774646931527')
    await member.roles.add(userRole)
    let profileData = await profileModel.findOne({ userId: member.id })
    if (!profileData) {
        let profile = await profileModel.create({
            userId: member.id,
            messages: 0,
            level: 0,
            xp: 0,
        })
        profile.save()
    }
    //image manipulation------------------------------------
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

    await Canvas.loadImage('https://i.imgur.com/YG47fdL.png').then(async (background) => {
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        context.font = applyText(canvas, member.displayName);
        context.fillStyle = '#ffffff';
        context.fillText(member.displayName, canvas.width / 2.5, canvas.height / 1.8);

        context.font = '26px "customFont"';
        context.fillStyle = '#26C9F9';
        context.fillText(`Welcome to ${member.guild.name}!`, canvas.width / 2.5, canvas.height / 3.2);

        context.font = '80px "customFont"';
        context.fillStyle = '#26C9F9';
        context.fillText(`#${member.guild.memberCount}`, canvas.width / 2.5, canvas.height / 1.15);

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png' }));
        context.drawImage(avatar, 25, 25, 200, 200);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');

        general.send({ embeds: [welcomeEmbed], files: [attachment] })
    })
})
//end------------------------------------




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
        profile.save()
    } else {
        xp=0.7 
        await profileData.updateOne({
            $inc: {
                messages: 1,
                xp: xp
            }
        })

        const messageConst = 200
        if (await profileData.xp > profileData.level * messageConst) {
            await profileData.updateOne({
                $inc: {
                    level: 1,
                    xp: -profileData.level * messageConst
                }
            })
            const levelUpChannel = await message.guild.channels.cache.get('948440351998345236')
            levelUpChannel.send(`<@!${message.author.id}> Has reached level ${Math.round(profileData.level + 1)}!`)

        }
        await profileData.save()
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 2000);


    }
    if (message.content.startsWith(`<@!${client.user.id}>`)) message.channel.send(`My prefix is \`${prefix}\``)

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
        client.commands.get('ban').execute(message, args, client);
    }
    if (command === 'kick') {
        client.commands.get('kick').execute(message, args, client);
    }
    if (command === 'unban') {
        client.commands.get('unban').execute(message, args, client);
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
    if (command === 'triggered') {
        client.commands.get('triggered').execute(message, args, client);
    }
    if (command === 'trash') {
        client.commands.get('trash').execute(message, args, client);
    }
    if (command === 'level' || command === 'lvl') {
        client.commands.get('level').execute(message, args, client);
    }
    if (command === 'serverstats' || command === 'serverinfo') {
        client.commands.get('serverstats').execute(message, args, client);
    }
    if (command === 'lb' || command === 'leaderboard') {
        client.commands.get('lb').execute(message, args, client);
    }
    if (command === 'ttt' || command === 'tictactoe') {
        client.commands.get('ttt').execute(message, args, client);
    }
    if (command === 'coinflip' || command === 'cf') {
        client.commands.get('coinflip').execute(message, args, client);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    const channel = '947046639883943987'
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
    const channel = '947046639883943987'
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



client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    intJ.Buttons(interaction)
});

client.login(process.env.TOKEN);
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const intJ = require('./interactions.js')
const row = require('./commands/credits.js')
const profanities = require('./commands/json/bad_words.json')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const commands = require(`./commands/${file}`);

    client.commands.set(commands.name, commands);
}

const prefix = "?"

client.once('ready', () => {
    console.log('Connected!')
    client.user.setPresence({
        status: 'dnd'
    })
    client.user.setActivity(`${prefix}help`, { type: 'PLAYING', url: 'https://i.imgur.com/SvQ0PxX.png' });

});

client.on('guildMemberAdd', async member => {
    const welcomeEmbed = new MessageEmbed()
        .setTitle('Welcome!')
        .setDescription(`Welcome **${member.displayName}** toLowerCase().includes(badwords[i].toLowerCase()) 
        confirm = true;our server! Follow the ` + member.guild.channels.cache.get('936495957531566080').toString() + ` and have a nice day!`)
        .setColor("#2682FF")
    const userRole = member.guild.roles.cache.find(role => role.name === 'User')
    member.guild.channels.cache.get('932985164718538752').send({ embeds: [welcomeEmbed] })
    member.roles.add(userRole)

})

client.on('messageCreate', message => {
    profanities.badwords.forEach(element => {
        if (message.content.toLowerCase().includes(element)) {
            message.delete()
            return message.channel.send('Do not swear!').then(msg => {
                msg.delete()
            })

        }

    });

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

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    intJ.CreditButton(interaction)
});













client.login(token);
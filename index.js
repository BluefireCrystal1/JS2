const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS], partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
    const commands = require(`./commands/${file}`);

    client.commands.set(commands.name, commands);
}

const prefix = "?"

client.once('ready', () =>{
    console.log('Connected!')
    client.user.setPresence({
      status: 'dnd'})
    client.user.setActivity(`${prefix}help`, { type: 'PLAYING', url: 'https://i.imgur.com/SvQ0PxX.png' });
  
  });

client.on('guildMemberAdd', async member =>{
    const welcomeEmbed = new MessageEmbed()
                .setTitle('Welcome!')
                .setDescription(`Welcome **${member.displayName}** to our server! Follow the ` +  member.guild.channels.cache.get('936495957531566080').toString() + ` and have a nice day!`)
                .setColor("#2682FF")
    const rulesEmbed = new MessageEmbed()
                .setTitle('Rules')
                .setDescription('**No Cussing** :face_with_symbols_over_mouth:\n\n**No NSFW** :underage:\n\n**Do not abuse a glitch or exploit it**, Report it to the developer (You can check by doing the dev/developer command present in some bots). :sparkles:\n\n**No insulting** Do no insult a developer if they did something very buggy or just very bad with the bot, they could be a beginner. :rage:\n\n**Have fun!**')
                .setColor("#2682FF")
                const userRole = member.guild.roles.cache.find(role => role.name === 'User')
                member.guild.channels.cache.get('932985164718538752').send({embeds: [welcomeEmbed, rulesEmbed]})
                member.roles.add(userRole)

})

client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    if(command === 'purge'){
        client.commands.get('purge').execute(message, args);
    }
    if(command === 'ban'){
        client.commands.get('ban').execute(message, args);
    }
    if(command === 'kick'){
        client.commands.get('kick').execute(message, args);
    }
    if(command === 'unban'){
        client.commands.get('unban').execute(message, args);
    }
    if(command === 'help'){
        client.commands.get('help').execute(message, args);
    }
    if(command === 'thread'){
        client.commands.get('thread').execute(message, args);
    }
    if(command === 'say'){
        client.commands.get('say').execute(message, args);
    }
    if(command === 'credits'){
        client.commands.get('credits').execute(message, args);
    }
    if(command === 'joke'){
        client.commands.get('joke').execute(message, args);
    }
    if(command === 'roast'){
        client.commands.get('roast').execute(message, args);
    }
    if(command === 'meme'){
        client.commands.get('meme').execute(message, args);
    }
    if(command === 'cat'){
        client.commands.get('cat').execute(message, args);
    }
});





client.login(token);
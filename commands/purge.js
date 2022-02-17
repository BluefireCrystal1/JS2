const helpList = require('./json/help.json')
const easterEgg = require('./easteregg.js')

module.exports = {
  name: 'purge',
  description: helpList.purge.value,

  async execute(message, args) {
    if (message.member.permissions.has('MANAGE_MESSAGES')) {
      if (!args[0]) return message.reply('Error: You did not enter an amount of messages you want to delete!')
      if (isNaN(args[0])) return message.reply(`Error: \`${args[0]}\` is not a number`)


      if (args[0] > 100) return message.reply('Error: Maximum number of messages which can be deleted is 100')
      if (args[0] < 1) return message.reply('Error: You must delete at least 1 message')

      await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
        message.channel.bulkDelete(messages);
        message.channel.send(`Deleted!`).then(msg => { setTimeout(() => msg.delete(), 5000) })

      try {

      }catch(err) {
        message.channel.send('You cannot delete messages that are 14 days or old')
      }


      })
    } else {
      reply = easterEgg.chanceRoll(5, "You do not have enough permissions", "Just complete your schooling and then u will understand why rules are written now go and beg owner for permission. and never try to run this command again.")
      message.channel.send(reply)
    }
  }
}
const { MessageEmbed, MessageAttachment } = require("discord.js")
const Memer = require("random-jokes-api");
const helpList = require('./json/help.json')
const canvacord = require("canvacord");

module.exports = {
    name: 'triggered',
    description: helpList.triggered.value,
    async execute(message, ...args) {
        const member = message.mentions.users.first() || message.author;
        let avatar = member.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new MessageAttachment(image, "triggered.gif");
        return message.channel.send({files: [attachment]});
  }
}
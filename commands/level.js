const { loadImage, createCanvas } = require('canvas')
const { MessageAttachment } = require('discord.js')
const profileModel = require('../models/profileSchema')
const helpList = require('./json/help.json')
const Canvas = require('canvas')
Canvas.registerFont('./Insanibc.ttf', { family: 'customFont' })
Canvas.registerFont('./Gameplay.ttf', { family: 'gameplayFont' })
Canvas.registerFont('./ka1.ttf', { family: 'ka1Font' })
const applyText = async (canvas, text) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;

    do {
        context.font = `${fontSize -= 10}px "customFont"`;
    } while (context.measureText(text).width > 669 - 192);

    return context.font;
};


module.exports = {
    name: 'level',
    description: helpList.level.value,
    async execute(message, args, client) {
        const canvas = createCanvas(701, 212);
        const context = canvas.getContext('2d');
        //---------------------
        const member = message.mentions.users.first() || message.author;
        const background = await loadImage('https://i.imgur.com/if0pM1J.png')
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        //---------------------
        let name = `${await member.username}#${await member.discriminator}`
        let profileData = await profileModel.findOne({ userId: member.id })
        const xp = Math.round(profileData.xp)
        const level = Math.round(profileData.level)
        //---------------------
        let lengthOfLine = ((668 - 193) / (level * 200)) * xp
        var grad = context.createLinearGradient(193, 152, 193 + lengthOfLine, 152);
        grad.addColorStop(0, "#00c2c7");
        grad.addColorStop(1, "#97ebdb");
        context.strokeStyle = grad
        context.lineWidth = 30;
        context.beginPath()
        context.moveTo(193, 152)
        context.lineTo(193 + lengthOfLine, 152)
        context.lineCap = 'round';
        context.stroke()
        //----------------------
        context.font = await applyText(canvas, name);
        context.fillStyle = '#ffffff';
        context.fillText(name, 197, 120);
        //-----------------
        context.font = "26px Sans Serif";
        context.fillStyle = '#ffffff';
        context.textAlign = 'right';
        context.fillText(`XP ${xp}/${level * 200}`, 653, 161);
        //----------------
        context.font = "30px 'ka1Font'";
        context.fillStyle = '#ffffff';
        context.textAlign = 'right';
        context.fillText(`Level ${level}`, 653, 50);
        //---------------------
        context.save();
        context.beginPath();
        context.arc(101, 108, 75, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        //---------------------
        const imagePfp = await loadImage(member.displayAvatarURL({ format: 'png' }))
        context.drawImage(imagePfp, 22, 30, 157, 156);
        //---------------------
        context.restore();
        const ifOnline = await message.guild.members.cache.filter(memberx => memberx.presence?.status === "online" && memberx.id === member.id);
        const ifDND = await message.guild.members.cache.filter(memberx => memberx.presence?.status === "dnd" && memberx.id === member.id);
        const ifIdle = await message.guild.members.cache.filter(memberx => memberx.presence?.status === "idle" && memberx.id === member.id);
        if (ifOnline.size > 0) {
            context.strokeStyle = '#40464E'
            context.fillStyle = '#3BA55D'
            context.lineWidth = 5
            context.beginPath()
            context.arc(146, 169, 15, 0, Math.PI * 2, true);
            context.closePath()
            context.stroke()
            context.fill()
        } else if (ifDND.size > 0) {
            context.strokeStyle = '#40464E'
            context.fillStyle = '#ED4245'
            context.lineWidth = 5
            context.beginPath()
            context.arc(146, 169, 15, 0, Math.PI * 2, true);
            context.closePath()
            context.stroke()
            context.fill()
            context.strokeStyle = '#40464E'
            context.lineWidth = 7
            context.beginPath()
            context.moveTo(134, 169.5)
            context.lineTo(159, 169.5)
            context.closePath()
            context.stroke()

        } else if (ifIdle.size > 0) {
            context.save()
            context.beginPath()
            context.arc(146, 169, 18, 0, Math.PI * 2, true);
            context.closePath()
            context.clip()
            context.strokeStyle = '#40464E'
            context.fillStyle = '#FAA81A'
            context.lineWidth = 5
            context.beginPath()
            context.arc(146, 169, 15, 0, Math.PI * 2, true);
            context.closePath()
            context.stroke()
            context.fill()
            context.fillStyle = '#40464E'
            context.beginPath()
            context.arc(139.5, 162.5, 11, 0, Math.PI * 2, true);
            context.closePath()
            context.fill()
        }


        else {
            context.strokeStyle = '#40464E'
            context.fillStyle = '#747F8D'
            context.lineWidth = 5
            context.beginPath()
            context.arc(146, 169, 15, 0, Math.PI * 2, true);
            context.closePath()
            context.stroke()
            context.fill()
            context.fillStyle = '#40464E'
            context.beginPath()
            context.arc(146, 169, 8, 0, Math.PI * 2, true);
            context.closePath()
            context.fill()

        }

        //430.5,105
        //192,669

        const attachment = new MessageAttachment(canvas.toBuffer());

        message.channel.send({ files: [attachment] })

    }
}
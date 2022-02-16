const profileModel = require('../models/profileSchema')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const helpList = require('./json/help.json')
const Canvas = require('canvas')
Canvas.registerFont('./Insanibc.ttf', { family: 'customFont' })
async function getName(id, client) {
    return await client.users.cache.find(user => user.id === id)
}
module.exports = {
    name: 'lb',
    description: helpList.lb.value,
    async execute(message, args, client) {
        let content = ''
        let count = 1
        let startYCord = 95
        const diff = 80
        const imageCords = [[20, 20], [40, 60], [40, 60], [50, 60], [60, 60], [70, 60], [80, 60], [90, 60], [100, 60], [110, 60]]
        const canvas = Canvas.createCanvas(920, 864);
        const context = canvas.getContext('2d');
        //location does not work use i.imgur
        const background = await Canvas.loadImage('https://i.imgur.com/2nhLQQM.png')
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const applyText = (canvas, text) => {
            const context = canvas.getContext('2d');
            let fontSize = 70;

            do {
                context.font = `${fontSize -= 10}px "customFont"`;
            } while (context.measureText(text).width > canvas.width - 300);

            return context.font;
        };


        const listUsers = await profileModel.find({}).sort({ level: 'desc' })
        for (const key in listUsers) {
            if (Object.hasOwnProperty.call(listUsers, key)) {
                const element = listUsers[key];
                let nameofuser = await getName(element.userId, client)
                try {

                    if (count >= 11) { break }
                    if (count == 1) {
                        context.save();
                        context.beginPath();
                        context.arc(455.5, 785.5, 62.5, 0, Math.PI * 2, true);
                        context.closePath();
                        context.clip()
                        const pfp = await Canvas.loadImage(nameofuser.displayAvatarURL({ format: 'png' }));
                        context.drawImage(pfp, 393, 723, 125, 125);
                        context.restore()
                    }
                    else if (count == 2) {
                        context.save();
                        context.beginPath();
                        context.arc(582.5, 785.5, 62.5, 0, Math.PI * 2, true);
                        context.closePath();
                        context.clip()
                        const pfp = await Canvas.loadImage(nameofuser.displayAvatarURL({ format: 'png' }));
                        context.drawImage(pfp, 520, 723, 125, 125);
                        context.restore()
                    }
                    else if (count == 3) {
                        context.save();
                        context.beginPath();
                        context.arc(322.5, 785.5, 62.5, 0, Math.PI * 2, true);
                        context.closePath();
                        context.clip()
                        const pfp = await Canvas.loadImage(nameofuser.displayAvatarURL({ format: 'png' }));
                        context.drawImage(pfp, 260, 723, 125, 125);
                        context.restore()
                    } else {
                        if (message.author.id === listUsers.userId) console.log("True")
                        context.save();
                        context.font = "36px 'customFont'"
                        context.fillStyle = '#33E3FF';
                        context.fillText(content += `${nameofuser.username}#${nameofuser.discriminator} | LVL: ${Math.round(element.level)}\n\n`, 226, 130);
                        
                        context.beginPath();
                        context.arc(169, startYCord, 25, 25, Math.PI * 2, true);
                        context.closePath();
                        context.clip()
                        const pfp = await Canvas.loadImage(nameofuser.displayAvatarURL({ format: 'png' }));
                        context.drawImage(pfp, 162, startYCord, 50, 50);
                        startYCord += diff
                        context.restore()
                    }
                    count += 1
                }

                catch (error) {
                    count -= 1
                }
            }
        }

        const attachment = new MessageAttachment(canvas.toBuffer(), 'image.png');
        await message.channel.send({ files: [attachment] })

    }
}
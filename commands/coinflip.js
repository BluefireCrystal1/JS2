const helpList = require('./json/help.json')
const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'coinflip',
    description: helpList.coinflip.value,
    async execute(message, args, client) {
        // u suck use this args.include("h") for head
        // and  for tails
        var headsOrTails = ["Heads", "Tails"];
        var rand = Math.floor((Math.random() * 2) + 1)
        var result = headsOrTails[rand - 1]
        message.channel.send("Flipping...").then(async msg => {
            msg.edit("Flipping..")
            msg.edit("Flipping.")
            msg.edit("Flipping")
            args = ("" + args).toLowerCase()
            if (args.includes("t") && args.includes("h")) {
                return msg.edit("You can not choose both")

            } else
                if (args.includes("t")) {
                    if (result == "Tails") {
                        msg.edit(result + " You got it correct (+2 XP)")
                        let profileData = await profileModel.findOne({ userId: message.author.id })
                        await profileData.updateOne({
                            $inc: {
                                xp: 2
                            }
                        })
                    }

                    else {
                        msg.edit(result + " You got it wrong (-3 XP)")
                        let profileData = await profileModel.findOne({ userId: message.author.id })
                        await profileData.updateOne({
                            $inc: {
                                xp: -3
                            }
                        })
                    }


                } else if (args.includes("h")) {
                    if (result == "Heads") {
                        msg.edit(result + " You got it correct (+2 XP)")
                        let profileData = await profileModel.findOne({ userId: message.author.id })
                        await profileData.updateOne({
                            $inc: {
                                xp: 2
                            }
                        })
                    }
                    else {
                        msg.edit(result + " You got it wrong (-3 XP)")
                        let profileData = await profileModel.findOne({ userId: message.author.id })
                        await profileData.updateOne({
                            $inc: {
                                xp: -3
                            }
                        })
                    }

                } else {
                    msg.edit(result)

                }//bruh include isnt a fricking function for args

        })
    }
}
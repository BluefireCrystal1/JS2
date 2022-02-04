function chanceRoll(chance,normalMessage,easterMessage) {
  i = Math.floor(Math.random() * 100)
  if (i < chance) {
    return easterMessage
  } else {
    return normalMessage 
  }
}

module.exports = {chanceRoll}
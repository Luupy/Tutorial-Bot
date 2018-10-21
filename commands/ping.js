exports.run = async function(bot, message, args) {
  message.channel.send("Calculando latência...").then(m => {
    m.edit(`Levei **${Date.now() - message.createdTimestamp}ms** para responder.\nTempo de resposta com o API do Discord: **${bot.ping}ms**`)
  })
}

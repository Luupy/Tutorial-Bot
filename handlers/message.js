const { DefaultPrefix } = require("../setup/config.js"),
      CommandCooldown   = new Set()

exports.run = async function(bot, message) {
  let user  = message.author
  let guild = message.guild

  if(user.bot) return

  if(guild) {
    if (message.content.startsWith(DefaultPrefix)) message.prefix = DefaultPrefix

    if(message.prefix) {
      let msg     = message.content.toLowerCase()
      let args    = message.content.slice(message.prefix.length).trim().split(/ +/g)
      let command = args.shift().toLowerCase()

      try {
        let commands = require(`../commands/${command}.js`)

        if(commands) {
          if(CommandCooldown.has(user.id)) {
            return message.reply("Você deve esperar 5 segundos para executar um comando novamente").then(msg => {
              setTimeout(() => {
                msg.delete()
              }, 1000 * 5)
            })
          }

          if(!CommandCooldown.has(user.id)) {
            CommandCooldown.add(user.id)
            setTimeout(() => {
              CommandCooldown.delete(user.id)
            }, 1000 * 5)
          }

          commands.run(bot, message, args)
        }
      } catch(e) {
        console.log(e)
      }
    }
  }
}

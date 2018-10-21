const { Client } = require("discord.js"),
      { TOKEN }  = require("../setup/config.js"),
      fs         = require("fs")

const client = new Client()

client.login(TOKEN).then(loginSuccess)

async function loginSuccess() {
  console.log("Foi!")
  if(client.shard) {
    console.log("Shard: " + (1+client.shard.id) + "/" + client.shard.count)
    client.user.setPresence({ game: { name: "Shard: " + (1+client.shard.id) + "/" + client.shard.count, type: 0} })
  }
  EventHandler()
}

async function EventHandler() {
  fs.readdir("./handlers/", (err, files) => {
    if(err) return console.log(err)

    files.forEach(file => {
      delete require.cache[require.resolve(`../handlers/${file}`)]

      let eventName = require(`../handlers/${file}`)
      let eventPure = file.split(".")[0]

      client.on(eventPure, (...args) => eventName.run(client, ...args))
    })
  })
}

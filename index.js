require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Conectado')
    client.user.setActivity('Brasileirão', {type: 'WATCHING'})
})

client.on('message', message => {

    if (message.content.startsWith(process.env.PREFIX)){ 

        if (message.author.bot) return

        const args = message.content.split(" ")
        args.shift()  

        const commandSplited = message.content.split(" ")[0]
        const command = commandSplited.replace(/^./g,"")
        command.toLowerCase()
        
        try {
            const commandHandler = require(`./comandos/${command}`)
            commandHandler.run(client, message, args) 
        }
        catch {
            message.channel.send('comando inválido')
        }
    }
  });

client.on('disconnect', () => {
    client.destroy()
})

client.login(process.env.TOKEN)
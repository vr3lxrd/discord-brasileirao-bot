const Discord = require("discord.js")
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const cheerio = require('cheerio')

exports.run = (client, message, args) => {

    const url = (`https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-a/2020`)
    axios(url)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        let timesTable = $('.expand-trigger > td > .hidden-xs')

        const times = []

        const embed1 = new MessageEmbed()
          .setTitle(`Times do Brasileirão série A`)
          .setColor('#0bef17')
          
        timesTable.each( (i) => {
            const individualTeam = timesTable[i].children[0]
            const time = individualTeam.data
            times.push({
              time
            })
            embed1.addField(time, '-----------',false)
            
        })
        message.channel.send(embed1)
      })
      .catch(console.error);
}
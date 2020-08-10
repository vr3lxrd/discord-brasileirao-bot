/*
Por algum motivo a imagem no embed ainda não funciona
*/

const Discord = require("discord.js")
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js')
const axios = require('axios')
const cheerio = require('cheerio')
const anosDisponiveis = ['2012','2013','2014','2015','2016','2017','2018','2019','2020']
const serieDisponiveis = ['a','b']

exports.run = (client, message, args) => {

    message.channel.send('Estamos fazendo a requisição, aguarde.')
      .then((message)=>{
        message.delete({timeout: 8000})
      })


    let ano = args[1]
    let serie = args[0].toLowerCase()

    if (args.length != 2) return message.channel.send('Use o comando digitando !tabela *série* *ano*\nExemplo: !tabela a 2020')
    if (!serieDisponiveis.includes(serie)) return message.channel.send('Não temos essa série disponível')
    if (!anosDisponiveis.includes(ano)) return message.channel.send('Não temos esse ano disponível')

    const url = (`https://www.cbf.com.br/futebol-brasileiro/competicoes/campeonato-brasileiro-serie-${serie}/${ano}`)
    axios(url)
      .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        let timesTable = undefined
        let pontosTable = undefined

        const getYearData = () => {
          if (ano > 2017 && ano < 2021){
            timesTable = $('.expand-trigger > td > .hidden-xs') 
            pontosTable = $('.expand-trigger > th')
          }
          else if (ano > 2011 && ano < 2018){
            timesTable = $('.tabela-expandir > tbody > tr > td > span')
            pontosTable = $('.tabela-expandir > tbody > tr > th')
          }
          else {      
            message.channel.send('Não tenho informação sobre esse ano. Apenas os campeonatos de 2012 a 2020.')
            return
          }
        }
        getYearData()
        const times = []

        const embed1 = new MessageEmbed()
          .setTitle(`Tabela Brasileirão ${ano} série ${serie.toUpperCase()}`)
          .setColor('#0bef17')
          
        timesTable.each( (i) => {
            const individualTeam = timesTable[i].children[0]
            const individualTeamPoints = pontosTable[i].children[0]
            const time = individualTeam.data
            const pontos = individualTeamPoints.data
            times.push({
              posicao: i + 1,
              time,
              pontos
            })
            embed1.addField(`${i + 1}º - ${time}`, `${pontos} pontos`, false)
            
        })
        message.channel.send(embed1)
      })
      .catch(console.error);
}
    

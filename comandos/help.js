const fs = require('fs').promises
const Discord = require('discord.js')
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');

exports.run = (client, message) => {

    async function listarArquivosDoDiretorio(diretorio, arquivos) {

    if(!arquivos)
        arquivos = [];

    let listaDeArquivos = await fs.readdir(diretorio);
    for(let k in listaDeArquivos) {
        let stat = await fs.stat(diretorio + '/' + listaDeArquivos[k]);
        if(stat.isDirectory())
            await listarArquivosDoDiretorio(diretorio + '/' + listaDeArquivos[k], arquivos);
        else
            arquivos.push(diretorio + '/' + listaDeArquivos[k]);
    }

    return arquivos;

}       

const helpEmbed = new MessageEmbed()
    .setTitle('Estou aqui para te ajudar')
    .setDescription('Aqui esta a lista de comandos deste bot')
    .setColor('green')

async function test() {
    let arquivos = await listarArquivosDoDiretorio('./comandos'); // coloque o caminho do seu diretorio
    arquivos.forEach((element, i) => {
        let textoLimpo = arquivos[i].replace('./comandos/',' ')
        let textoLimpoDois = textoLimpo.replace('.js',' ')
        helpEmbed.addField(textoLimpoDois,':page_facing_up:',false)
    });
    message.channel.send(helpEmbed)
}

test()

}

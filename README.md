# Passos iniciais para desenvolvimento do Bot

> Esse é um projeto de fins educativos e todas as práticas também

**Programas necessários**

 - [Git](https://git-scm.com)
 - (Opcional) [Github Desktop](https://desktop.github.com)
 - [Node.js](https://nodejs.org/en/)
 - IDE do seu agrado (recomendável [VSCODE](https://code.visualstudio.com) ou [Sublime](https://www.sublimetext.com))

## **Configuração de um ambiente node.js**

Na pasta do projeto, use o terminal node para rodar o seguinte comando
	

    npm init -y
    
   Esse comando irá gerar um arquivo "*package.json*" completo na sua pasta, onde você pode alterar algumas informações como a versão do projeto, nome do autor, versão etc
   Este é o "principal" arquivo tem uma aplicação node, pois nele se manterão as informações de dependências instaladas e de controle de versão.
   Ao rodar o comando de instalação do **discord.js** por exemplo
   

    npm install discord.js --save
Seu *package.json* irá mudar, sendo acrescentado as seguintes linhas

    "dependencies": {
	    "discord.js": "^12.2.0"
	}
O objeto "*dependencies*" dentro do *package.json* é fundamental quando se trata de praticidade no desenvolvimento e no upload dos arquivos pro git

> É bom deixar claro que o --save usado no comando de install garante que o objeto dependencies seja adicionado ao package.json

Após isso, na sua pasta já teremos uma pasta *node_modules*, um *package.json* e um *package-lock.json*
Na pasta **node_modules** estão os arquivos que você baixou utilizando o comando `npm install`, que nesse caso foi o *discord.js*.

Por fim, para tornar o ambiente node pronto pro git, adicionaremos um arquivo chamado **.gitignore**

> O .gitignore serve pra não mandar certas coisas para o git, que nesse
> caso, seria a pasta node_modules.

Mais cedo usamos o comando **--save** pra salvar nossas dependências no *package.json*, por isso, não é necessário enviar os arquivos que baixamos em nosso computador, pois, qualquer pessoa com o *package.json* em alguma pasta pode rodar o comando `npm install` (apenas isso) e toda a pasta node_modules é baixada novamente por meio do gerenciador de pacotes npm, deixando o commit de alterações mais limpo e muito menos pesado.

No arquivo .gitignore, somente digitamos o nome da pasta que queremos adicionar, ou seja, apenas

    node_modules



## Começando a configurar o bot discord.js
Após todos os processos, a sua pasta deve parecer um pouco com isso

 - node_modules
 - .gitignore
 - package.json
 - package-lock.json
 
 Se está dessa forma, já podemos iniciar o próximo passo, onde vamos ligar o bot.
Crie um arquivo chamado index.js (ou o nome do entry point que você definiu no package.json). 
*index.js* é o entry point padrão dos projetos de node.js, um entry point define onde o node deve agir primeiro, por isso, é o arquivo mais importante do projeto. Se você não mexeu em nada, provavelmente seu package.json apresenta a seguinte linha:

    "main": "index.js"
Caso queira mudar o entry point, para por exemplo "*bot.js*" ou *"iniciar.js*", é só mudar o atributo main, mostrado acima

    "main": "bot.js" || "main": "iniciar.js"

> Porém, é recomendado manter o padrão universal de index.js.

**Trazendo o módulo discord.js para o index.js**
Como estamos trabalhando com node, precisamos importar o módulo desejado para o nosso arquivo de trabalho, para isso, iremos usar a função *require*

    const Discord = require('discord.js') 
O require trabalha procurando uma pasta chamada 'discord.js' dentro da pasta node_modules, por isso não precisamos especificar o diretório de 'discord.js'

> A função de import foi uma facilidade trazida pela ES6, mas ainda não sei usar muito bem, então se quiserem podem tentar usar :S

Agora que temos as funcionalidades de discord.js no nosso arquivo, precisamos usar a principal delas, que cria uma instância de client discord que fará nosso bot ficar online, ler e enviar mensagens, entrar nos canais etc
Como padrão e demonstrado na [Documentação](https://discord.js.org/#/), usaremos a constante client para definir essa instância.

    const client = new Discord.Client()
Se dermos um *console.log(client)*, da pra ver que ele é um objeto lotado de funções e informações que vamos usar a partir de agora.

***A partir de agora, é necessário que você tenha criado uma aplicação de BOT no site oficial do discord e tenha seu token em mãos, caso ainda não tenha feito, acesse*** [aqui](https://discord.com/developers/applications)

Com o seu token em mãos, vamos fazer uma configuração inicial de segurança. Esse token não deve ser publicado no git ou em nenhuma outra parte da internet, pois compromete sua conta e seu bot. Publicar ele no git fará que o discord imediatamente resete seu token para um novo (experiência própria :S)

Nessa parte, você pode ter 2 opções:
**dotenv** --> recomendado em projetos grandes, então é importante saber como funciona
**config.json** --> recomendado por mim, já que estamos apenas num projeto de estudo

> Procurem saber como funciona o dotenv e tentem usar no projeto de
> vocês, mas a forma que eu vou usar no tutorial vai  ser a de
> config.json pela praticidade e por não precisar instalar mais um
> pacote de dependências, mas ainda vamos usar ele futuramente.

Na pasta do seu projeto, crie uma pasta *"config"* e dentro dessa pasta crie um arquivo **config.json**, que será usado para armazenar configurações e informações do bot que não devem ficar na index.js
Dentro da sua config.json, crie uma variável como essa

    {
    "token":"seu-token-aqui"
    }

É claro que você pode adicionar mais informações, como por exemplo

    {
    "token":"seu-token-aqui",
    "prefix":"!",
    "autor":"vr3lxrd"
    }

Mas por enquanto, apenas o token basta. Agora, faça o require do arquivo config.json dentro da sua index, usando um conceito parecido com o discord.js, mas para ele precisamos definir o caminho do diretório, pois não está dentro da pasta node_modules, por exemplo

    const config = require('./config/config.json')

**Ligando o bot**

Se você fez tudo certo e convidou o seu bot para um servidor, agora passamos para ver ele online na lista do servidor.
Usaremos uma função do client que chamamos acima, que é a **client.login('token-aqui')**, ela é responsável por fazer a comunicação entre seu código e a API do discord.

    const  Discord = require('discord.js')
    const config = require('./config/config.json')
    const  client = new  Discord.Client()
    
  
    client.login(config.token)

Se tudo estiver certo, você verá seu bot online e já poderá a começar a trabalhar totalmente com as funções do discord.js

## Adicionando comandos ao nosso bot
A principal função que usamos do client em um bot é a **client.on()**
Essa função é praticamente como um *eventListener* do javascript usado no navegador, onde esperamos uma certa ação do usuário pra executarmos uma função interna. Um dos principais eventos do client.on, por exemplo, é o *'message'*, que dispara nossas instruções quando o client recebe uma mensagem, que pode ser lida por ele.

> Para ver todos os eventos disponíveis no client.on() acesse [esse repositório](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584), muito bem feito por sinal, que lista e demonstra os eventos e os argumentos que elas trazem.

**O evento 'message'**
Por se tratar de um bot de chat, as mensagens, enviadas e trocadas tornam-se a principal ferramenta de controle, por isso, vamos começar olhando como ela funciona

    client.on('message', (msg) => {
	~~~~seu código acontece aqui~~~~
	})
	    
 Basicamente, definimos em 'message', que o evento que procuramos nesse bloco de código é uma mensagem nova. Essa mensagem, quando recebida, é alocada na variável **'msg'** (ou qualquer variável que você definir), que está dentro dos parenteses da função de callback

> "Uma função de callback é um função que é ativada quando outra função é ativada"
> Basicamente uma função que recebe o parâmetro recebido pela função maior... confuso mas é isso 

Se dermos um console.log(msg) ao receber uma mensagem (o que eu recomendo muito, pra destrinchar as possibilidades), da pra ver que o que foi alocado é um objeto cheio de valores sobre a mensagem enviada, como o autor **(msg.author)**, o id do canal enviado **(msg.channel)** ou o conteúdo da mensagem **(msg.content)**

**Comando simples**
Como exemplo inicial, podemos fazer um comando simples que responde no mesmo canal, uma mensagem de "oi"

    client.on('message',(msg) => {
	   if (msg.content === 'oi') msg.channel.send(`olá ${msg.author}`)
	})
Neste exemplo, usamos as 3 propriedades faladas acima, e usamos ainda a função send(), própria do discord.js, que envia uma mensagem definido por você no canal escolhido.

Destrinchando o código para entender melhor, o `if (msg.content === 'oi')` busca se o corpo inteiro da mensagem é apenas 'oi', se fosse 'Oi' ou 'oi bot', por exemplo, o  bot não responderia.

> Por isso, a prática de comandos estáticos assim não é a ideal

Já `msg.channel.send` usa a propriedade msg.channel pra reconhecer onde foi enviada a mensagem de comando e envia a mensagem`(olá ${msg.author})`, onde a presença msg.author, que retorna o autor da mensagem inicial, faça com que o bot responda a mensagem marcando quem enviou o comando inicial

**Organizando os comandos**

Primeiramente, não queremos que o bot responda sem ser chamado, pra isso definimos um **prefix** antes das mensagens, pra separamos uma conversa normal de um comando para o bot, normalmente como *"!", "."* etc

No nosso projeto, definiremos o prefix no arquivo config.json, como fizemos com o token, e como exemplifiquei também.

Com o prefix em mãos, podemos começar a desenvolver um **commandHandler**, que irá dividir a mensagem recebida em *"comando"* e *"argumentos"*, e com isso, manteremos apenas um *listener 'message*' na index.js, mantendo o arquivo principal mais limpo e responsável apenas pelo redirecionamento.

> Lembrando que essa é minha forma de desenvolver, fique a vontade de fazer do seu jeito se quiser

    client.on('message', msg  => {
	    
	    // aqui filtramos apenas mensagens que começam (startsWith) com o prefix definido
	    
	    if (msg.content.startsWith(config.prefix)){
    
				// checagem para o bot não responder a si mesmo, encerrando a função caso o
				// autor da mensagem seja um bot
			    if (message.author.bot) return
				
		// criamos a constante args, que recebe o conteudo da mensagem separado em um array		   		    
		
		const  args = msg.content.split(" ")
		
		// e com a função shift(), tiramos o elemento 0 do array, que seria o comando
		
	    args.shift()
    
	    // aqui limpamos a mensagem por meio de um regex, pra entendermos qual é o comando
	    // ex: !tabela 2019 --> command = tabela / args = [2019]
	    
	    const  commandSplited = msg.content.split(" ")[0]
	    const  command = commandSplited.replace(/^./g,"")
	    command.toLowerCase()
		
		// vou explicar melhor essa parte inferior na continuação do texto
		
	    try {
		    const  commandHandler = require(`./comandos/${command}`)
		    commandHandler.run(client, msg, args) 
	    }
	    catch {
		    msg.channel.send('comando inválido')
	    } 
	    }
    });

O código mostrado acima é o command handler que eu uso nos 2 bots que tenho, e é relativamente simples ainda.
Como estamos trabalhando com node.js, **é possível desenvolver os comandos de forma modular**, por isso, eu os coloco em uma pasta separada

Nessa parte, try e catch possuem uma grande importância. A função desses dois é "tentar" executar uma função na parte **try{}**, que nesse caso seria requisitar o comando, e em caso de erro, ao invés de quebrar o código, a função executada é a **catch{}**

Basicamente, meu código procura um arquivo na pasta comandos, por meio do *require()*, com o nome do comando que foi recebido no *listener*, e executa se encontrado, caso não, ele envia a mensagem de 'comando inválido'

Com isso pronto, você pode criar uma pasta 'comandos' e pra cada comando, um arquivo.js. Por exemplo: o comando "*!oi*" teria o arquivo oi.js

**Exportando comandos para a index.js**

Apenas o command handler não irá garantir que seu código funcione, para cada comando separado, vc precisa exportá-los

Basicamente, nosso comando simples de resposta oi.js teria o seguinte formato

    // é necessário declarar esses dois novamente
    
    const  Discord = require("discord.js")
    const  client = new  Discord.Client()
    
    // o .run pode ser qualquer nome, pois o arquivo vira um modulo, que pode ser executado
    // nesse caso, executariamos escrevendo oi.run(), o que o command handler faz
    
    exports.run = (client, msg, args) => {
    	msg.channel.send(`olá ${msg.author}`
    }

Pronto, agora é só criar outros comandos usando esse preset dentro da pasta de comandos :D

**Como vou passar pra parte de node fazendo requisições, vou deixar o compilado de alguns links pra aprender discord.js individualmente**

 - [Documentação da comunidade sobre discord.js](https://discordjs.guide/ "https://discordjs.guide/")
 - [Lista de eventos](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584) 
 - [Guia de eventos](https://anidiots.guide/understanding/events-and-handlers)
 - discord.js.org
 
 **Estude Javascript e Node também, super importante**
 - [Documentação JS](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
 - [Mini curso de JS no youtube](https://www.youtube.com/watch?v=i6Oi-YtXnAU)
 - [Introdução ao Node](https://nodejs.dev/learn)
 ## Fazendo requisições com node.js
Existem diversos pacotes de node.js que trabalham com requisições http, e nesse projeto, usaremos um deles que é o **Axios** 
Para instalar:

    npm install axios --save
Lembrando que estamos no projeto do  bot do brasileirão, faremos um novo arquivo na pasta de comandos 

> Se você não está programando no formato modular, faça tudo na index.js

Nesse caso, irei criar um novo comando chamado *requisicao.js* e usar o require para termos acesso as funções do Axios no nosso arquivo.

    const  Discord = require("discord.js")
    const  client = new  Discord.Client()
    const axios = require('axios')
    
    exports.run = (client, msg, args) => {
    	
    }
Para os testes de funcionamento do Axios, usaremos [este site](https://reqres.in) para fazer as requisições

Explicando rapidamente o que faremos, basicamente usaremos uma ferramenta para ter acesso a informações de alguma página da internet, que nos retornarão um documento JSON com as informações requisitadas.
O uso de API's são baseadas nisso, e é o que usaremos para carregar toda a página do site onde faremos web scraping.

> Quando você digita seu CEP e o site reconhece suas informações, ele está fazendo uma requisição HTTP para uma API de CEP (mostrarei como funciona)

No primeiro exemplo, faremos uma requisição simples usando o site que mandei acima. O objetivo é mostrar no console uma lista em forma de objeto que esse site nos fornece, usando o método **"get"** do axios

    exports.run = (client, msg, args) => {
	    axios.get('https://reqres.in/api/users?page=2')
	    .then(response  => {
		    console.log(response.data)
	    })  	
    }

> Como adendo, usar uma função .catch() depois da .then é extremamente recomendada para evitar problemas com erros em requisição

		  
No exemplo usei a primeira requisição disponível no site, usando a função axios.get na url desejada, guardando a resposta da requisição como 'response' e por final mostrando as informações no console.

Desta forma, no console veremos vários objetos com informações fictícias de algumas pessoas, mas se colocassemos apenas `console.log(response)` veriamos várias informações sobre a requisição, como o status, headers etc.

Pronto, você já fez uma requisição http :D
Outras ferramentas node http que você pode estudar se quiser:

 - [Request](https://www.npmjs.com/package/request)
 - [SuperAgent](https://github.com/visionmedia/superagent)
 - [Fetch](https://github.com/visionmedia/superagent)
 
 Todos esses são pacotes que facilitam requisições Ajax do javascript padrão, então, se quiser saber como funciona do jeito oficial, estude [Ajax](https://developer.mozilla.org/pt-BR/docs/Web/Guide/AJAX/Getting_Started)
 ## Continua.. Cheerio fazendo web scraping
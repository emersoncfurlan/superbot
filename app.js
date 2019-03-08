const readline = require('readline-sync');
const googleTrends = require('google-trends-api');
const Parser = require('rss-parser');
const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR' 

const bots = {
    texto: require('../superbot_projeto/bots/text'),
    audio: require('../superbot_projeto/bots/watson')
}

start();

async function start() {
    const conteudo = {};
    
    conteudo.termoDeBusca = await perguntaRetornandoTermoDeBusca();
    conteudo.prefixo = await perguntaRetornandoPrefixo();
    await bots.audio(await bots.texto(conteudo)) 

    async function perguntaRetornandoTermoDeBusca () {
        const resposta = readline.question('Digite um termo de pesquisa da Wikipedia ou G para buscar por tendencias do Google: ')
        return ((resposta.toUpperCase() === 'G') ?  await perguntaRetornandoTendenciaDeTermoDeBusca() : resposta)
    }

    async function perguntaRetornandoTendenciaDeTermoDeBusca() {
        console.log('Aguarde um momento...')
        const tendencia = await getGoogleTrends()
        const escolhida = readline.keyInSelect(tendencia, 'Escolha um dos termos disponiveis:');
        return tendencia[escolhida]
      }

    async function perguntaRetornandoPrefixo(){
        const prefixo = ['Quem e', 'O que e', 'A historia de'];
        const indexPrefixoSelecionado = readline.keyInSelect(prefixo, 'Escolha uma opcao: ' );
        const textoPrefixoSelecionado = prefixo[indexPrefixoSelecionado]
        return textoPrefixoSelecionado;
    }   

    async function getGoogleTrends () {
        const parser = new Parser()
        const trends = await parser.parseURL(TREND_URL)
        return trends.items.map(({title}) => title)
    }
}
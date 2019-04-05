const readline = require('readline-sync');
const googleTrends = require('google-trends-api');
const Parser = require('rss-parser');
const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR' 
const state = require('../bots/state')

async function trends(){
    const content = {
        //useFecthContentFromWikipediaAlgorithmia: false,
        maximumSentences: 7
    }
    //content.useFecthContentFromWikipediaAlgorithmia = await askReturnEngine();
    content.searchTerm = await askReturnSearchTerm();
    content.prefix = await askReturnPrefix();
    content.lang = await askAndReturnLanguage();

    state.save(content);

    async function askReturnEngine() {
        const response = readline.question('Digite A para utilizar o Algorithmia ou W para o Wikipedia API: ')
        if(response.toUpperCase()=='A'){
            return true;
        }else{
            return false;
        }
    }
    
    async function askReturnSearchTerm() {
        const response = readline.question('Digite um termo de pesquisa da Wikipedia ou G para buscar por tendencias do Google: ')
        return ((response.toUpperCase() === 'G') ?  await askReturnTrendDesearchTerm() : response)
    }
    
    async function askReturnTrendDesearchTerm() {
        console.log('Aguarde um momento...')
        const tendencia = await getGoogleTrends()
        const escolhida = readline.keyInSelect(tendencia, 'Escolha um dos termos disponiveis:');
        return tendencia[escolhida]
    }
    
    async function askReturnPrefix(){
        const prefix = ['Quem e', 'O que e', 'A historia de', 'Como fazer', 'Como surgiu', 'Quais as causas de'];
        const indexprefixSelecionado = readline.keyInSelect(prefix, 'Escolha uma opcao: ' );
        const textoprefixSelecionado = prefix[indexprefixSelecionado]
        return textoprefixSelecionado;
    }   
    
    async function askAndReturnLanguage(){
        const linguagem = ['pt','en', 'es', 'fr']
        const index = readline.keyInSelect(linguagem,'Escolha um idioma: ')
        const linguagemSelecionada = linguagem[index]
        return linguagemSelecionada
      }
    
    async function getGoogleTrends () {
        const parser = new Parser()
        const trends = await parser.parseURL(TREND_URL)
        return trends.items.map(({title}) => title)
    }
}
async function tts(){
    content.tts.idioma = await setIdioma();
    content.tts.formato = await setFormato();
    content.tts.nome = await setNome();
    state.save(content);
    async function setIdioma(){
        var resposta = readline.question('Defina o idioma, 1 para PT-BR, 2 para EN-US, 3 - para japones: ')
        switch (resposta) {
            case "1":
                return idioma = "pt-BR_IsabelaVoice";
            case "2":
                return idioma = "en-US_LisaVoice";
            case "3":
                return idioma = "ja-JP_EmiVoice";
            default:
                break;
        }
    }

    async function setFormato(){
        var resposta = readline.question('Digite 1 para .wav e 2 para .mp3 : ')
        switch (resposta) {
            case 'wav':
                return formato = 'audio/wav';
            case 'mp3':
                return formato = 'audio/wav';
            default:
                break;
        }
    }
    async function setNome(){
        return nome = readline.question('Digite o nome para o arquivo de audio : ')
    }
}
module.exports = { trends, tts };
    
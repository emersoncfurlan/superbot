const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia.json').apiKey;
const sentenceBoundaryDetection = require('sbd');

async function bot(conteudo) {
    await buscarConteudoDaWikipedia(conteudo)
    await limpaConteudo(conteudo)
    return conteudo = await pegaPrimeiraSentenca(conteudo)

    async function buscarConteudoDaWikipedia(conteudo) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResposta = await wikipediaAlgorithm.pipe(conteudo.termoDeBusca);
        const wikipediaConteudo = wikipediaResposta.get();
        conteudo.sourceContentOriginal = wikipediaConteudo.content
    }

    function limpaConteudo(conteudo) {
        const semLinhasBrancasMarcadores = removeLinhasBrancasMarcadores(conteudo.sourceContentOriginal)
        const semDatasEntreParenteses = removeDatesInParentheses(semLinhasBrancasMarcadores)
        conteudo.sourceContentSanitized = semDatasEntreParenteses

        function removeLinhasBrancasMarcadores(texto) {
            const todasLinhas = texto.split('\n')
            const semLinhasBrancasMarcadores = todasLinhas.filter((linha) => {
                if (linha.trim().length === 0 || linha.trim().startsWith('=')) {
                    return false
                }
                return true
            })
            return semLinhasBrancasMarcadores.join(' ')
        }
    }

    function removeDatesInParentheses(texto) {
        return texto.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
    }

    function quebraConteudoEmSentencas(conteudo) {
        conteudo.sentences = []
        const sentenca = sentenceBoundaryDetection.sentences(conteudo.sourceContentSanitized)
        sentenca.forEach((sentenca) => {
            conteudo.sentences.push({
                text: sentenca,
                keywords: [],
                images: []
            })
        })
    }
    
    function pegaPrimeiraSentenca(conteudo) {
        conteudo.sentences = []
        const sentenca = sentenceBoundaryDetection.sentences(conteudo.sourceContentSanitized)
        console.log("\nConteudo a ser gravado em audio:  "+sentenca[0]+"\n")
        return sentenca[0]
    }
}

module.exports = bot

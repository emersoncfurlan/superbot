const readline = require('readline-sync');

function start() {
    const conteudo = {};

    conteudo.searchTerm = perguntaRetornandoTermoDeBusca();
    conteudo.prefix = perguntaRetornandoPrefixo();

    function perguntaRetornandoTermoDeBusca(){
        return readline.question('Digite um termo de pesquisa: ')
    }

    function perguntaRetornandoPrefixo(){
        const prefixo = ['Quem é', 'O que é', 'A história de'];
        const indexPrefixoSelecionado = readline.keyInSelect(prefixo, 'Escolha uma opção: ' );
        const textoPrefixoSelecionado = prefixo[textoPrefixoSelecionado]
        return textoPrefixoSelecionado;
    }
    console.log(conteudo)
}
start();

const state = require('./state');
const fs = require('fs');
const textToSpeech_apikey = require('../credentials/watson').textToSpeech_apikey;
const textToSpeech_url = require('../credentials/watson').textToSpeech_url;
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
const textToSpeech = new TextToSpeechV1({
    iam_apikey: textToSpeech_apikey,
    url: textToSpeech_url
});

async function tts(){
    var contador =0;
    const content = state.load();
    criaAudios(content);   
    async function criaAudios(content){
        const lang = 'pt-BR_IsabelaVoice';
        for(const sentence of content.sentences){
            const query = `${content.searchTerm} ${sentence[0]}`;
            await speak(textToSpeech, sentence, lang);
        }
    
        async function speak(textToSpeech, sentence, lang) {
            console.log(sentence.text);
            var params = {
                text: sentence.text,
                voice: lang,
                accept: 'audio/wav'
            }
            textToSpeech.synthesize(params, function(err, audio) {
                if (err) {
                    console.log(err);
                    return;
                }
                contador++;
                textToSpeech.repairWavHeader(audio);
                fs.writeFileSync("content/"+contador+'.wav', audio);
                console.log('Arquivo de Audio gerado com sucesso!');
            });
        }
    }
}

module.exports = tts;
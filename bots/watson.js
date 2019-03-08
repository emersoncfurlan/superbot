const fs = require("fs");
const textToSpeech_apikey = require('../credentials/watson').textToSpeech_apikey;
const textToSpeech_url = require('../credentials/watson').textToSpeech_url;

async function bot(conteudo){
    
    await instanciaTextToSpeech(conteudo);
    
    async function instanciaTextToSpeech(conteudo) {
        var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
        var textToSpeech = new TextToSpeechV1({
            iam_apikey: textToSpeech_apikey,
            url: textToSpeech_url
        });

        speak(conteudo);
        function  speak(conteudo) {
            var params = {
                text: conteudo,
                //voice: "pt-BR_IsabelaVoice",
                voice: "en-US_LisaVoice",
                accept: 'audio/wav'
            }
            textToSpeech.synthesize(params, function(err, audio) {
                if (err) {
                    console.log(err);
                    return;
                }
                textToSpeech.repairWavHeader(audio);
                fs.writeFileSync('Audio_SuperBot.wav', audio);
                console.log('Arquivo de Audio gerado com sucesso!');
            });
        }
    }
}

module.exports = bot

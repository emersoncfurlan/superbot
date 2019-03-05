const fs = require("fs");
//CREDENCIAIS
const textToSpeech_apikey = 'SUA_API_KEY';
const textToSpeech_url = 'URL';

var text = "Vamos criar um superbot juntos?          Colabore já!"
instanciaTextToSpeech(text);

function instanciaTextToSpeech(text) {
    var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
    var textToSpeech = new TextToSpeechV1({
        iam_apikey: textToSpeech_apikey,
        url: textToSpeech_url
    });

    speak(text);

    function  speak(text) {
        var params = {
            text: text,
            voice: "pt-BR_IsabelaVoice",
            accept: 'audio/wav'
        }
        // Sintetiza a fala, corrija o cabeçalho wav e salve no disco
        textToSpeech.synthesize(params, function(err, audio) {
            if (err) {
                console.log(err);
                return;
            }
            textToSpeech.repairWavHeader(audio);
            fs.writeFileSync('src/audio/colabore.wav', audio);
            console.log('Arquivo de Audio gerado com sucesso!');
        });
    }
}

let pokemonsen = require('pokemon-english')
let pokemonsfr = require('pokemon-french')
let pokemonGif = require('pokemon-gif');
var login = require("facebook-chat-api");
var urlStream = require('url-stream');
var fs = require('fs');
var http = require('http');

for (var i = 0; i < pokemonsfr.length; i++) {
    pokemonsfr[i] = RemoveAccents(pokemonsfr[i]).toLowerCase()
    pokemonsen[i] = RemoveAccents(pokemonsen[i]).toLowerCase()
}

// let stream = fs.createWriteStream('pikachu.gif')
// process.stdin.pipe(transform).pipe(stream);

// Create simple echo bot
login({email: "q.lapointe@gmail.com", password: "quentinfb"}, function callback (err, api) {
    if(err) return console.error(err);
    api.setOptions({
        selfListen: true
    })

    api.listen(function callback(err, message) {
        if (message.body) {
            let mots = RemoveAccents(message.body).toLowerCase().split(' ')
            for (var i = 0; i < mots.length; i++) {
                try {
                    url = pokemonGif(pokemonsfr.indexOf(mots[i]) + 1)
                    var request = http.get(url, function(response) {
                        api.sendMessage({attachment: response}, message.threadID);
                    });
                } catch (e) {

                }
            }
        }
    });
});

function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
    var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
    for (var y = 0; y < strAccentsLen; y++) {
    	if (accents.indexOf(strAccents[y]) != -1) {
    		strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
    	} else {
            strAccentsOut[y] = strAccents[y];
        }
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

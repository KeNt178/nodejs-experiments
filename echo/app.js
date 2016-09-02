var login = require("facebook-chat-api");

boom = 1472832000*1000

// Create simple echo bot
login({email: "q.lapointe@gmail.com", password: "quentinfb"}, function callback (err, api) {
    if(err) return console.error(err);
    api.listen(function callback(err, message) {
        if (message.senderID === '523068720' && message.threadID === '1508669706099241') {
            api.sendMessage('Attention Lulu: ' + (boom - message.timestamp) / (1000*60) + ' minutes avant la fin des inscriptions !', message.threadID);
        }
    });
});

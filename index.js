"use strict";

const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require('readline');

const funcs = [`wiadomości`, `aktualności`, `everyone`, `mojagrupa`, `kotek`, `piesek`, `help`, `dodaj`, `usuń`, `mc`].sort();
const funcsObj = {};

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.funcs = funcs;
if(fs.existsSync("priviliges.json")) {
    exports.permission = JSON.parse(fs.readFileSync('priviliges.json'));
} else {
    exports.permission = [];
}

funcs.map((v) => {
    funcsObj[v] = require('./modules/' + v);
});

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) {
        switch (err.error) {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
    api.setOptions({selfListen: true, logLevel: "silent"});
    api.listen((err, message) => {
        if(err) console.error(err);
        if(message.body.startsWith("!")) {
            const split = message.body.split(" ");
            try {
                funcsObj[split[0].substr(1).toLowerCase()](textMSG => api.sendMessage(textMSG, message.threadID), message, api, split);
            }
            catch (e) {
                if(!(e.message == "funcsObj[split[0].substr(...).toLowerCase(...)] is not a function")) console.error(e);
            }
        }
    });
});

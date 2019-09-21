"use strict";

const fs = require("fs");
const login = require("facebook-chat-api");

const funcs = [`wiadomości`, `aktualności`, `everyone`, `mojagrupa`, `kotek`, `piesek`, `help`, `dodaj`, `usuń`, `mc`].sort();
const funcsObj = {};

exports.funcs = funcs;
exports.permission = JSON.parse(fs.readFileSync('priviliges.json'));

funcs.map((v) => {
    funcsObj[v] = require('./modules/' + v);
});

login({appState: JSON.parse(fs.readFileSync('fakeAccount.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);
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

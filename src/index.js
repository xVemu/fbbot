"use strict";

const fs = require("fs");
const login = require("facebook-chat-api");
const readline = require('readline');

let funcsObj = {};
let funcs = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.readdir("src/modules", (err, files) => {
    if(err) console.error(err);
    files.map((v) => {
        funcsObj[v.replace(".js", "")] = require('./modules/' + v.replace(".js", ""));
        funcs.push(v.replace(".js", ""));
    });
})

exports.funcs = funcs;
if(fs.existsSync("priviliges.json")) exports.permission = JSON.parse(fs.readFileSync('priviliges.json'));
else exports.permission = [];

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}/* {email: "kamilox26@gmail.com", password: "FacebookChujCiNaJD"} */, (err, api) => { //test account id : 100039047052757 , test account microsft edge: 100038916831294
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
    if(!fs.existsSync("appstate.json")) fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
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
console.log(this.permission);
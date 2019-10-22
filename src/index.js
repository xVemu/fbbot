`use strict`;

const fs = require(`fs`),
    login = require(`facebook-chat-api`),
    readline = require(`readline`);

let funcsObj = {},
    funcs = [],
    notexist,
    appState;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fs.readdir(`src/modules`, (err, files) => {
    if(err) console.error(err);
    files.map(v => {
        funcsObj[v.replace(`.js`, ``)] = require(`./modules/` + v.replace(`.js`, ``));
        funcs.push(v.replace(`.js`, ``));
    });
});

exports.funcs = funcs;
if(fs.existsSync(`priviliges.json`)) exports.permission = JSON.parse(fs.readFileSync(`priviliges.json`));
else exports.permission = [];

if(!fs.existsSync(`appstate.json`)) {
    notexist = true;
    appState = {email: `kamilox26@gmail.com`, password: ``};
} else appState = {appState: JSON.parse(fs.readFileSync(`appstate.json`, `utf8`))};

login(appState, {logLevel: `http`, selfListen: true, forceLogin: true, userAgent:`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3930.0 Safari/537.36`}, (err, api) => { //test account id : 100039047052757 , test account microsft edge: 100038916831294
    if(err) {
        switch (err.error) {
        case `login-approval`:
            console.log(`Enter code > `);
            rl.on(`line`, line => {
                err.continue(line);
                rl.close();
            });
            break;
        default:
            console.error(err);
        }
        return;
    }
    if(notexist) fs.writeFileSync(`appstate.json`, JSON.stringify(api.getAppState()));
    api.listen(async (err, message) => {
        if(err) console.error(err);
        if(message.body.startsWith(`!`)) {
            const split = message.body.split(` `);
            try {
                const msg = await funcsObj[split[0].substr(1).toLowerCase()](message, api, split);
                api.sendMessage(msg, message.threadID);
            }
            catch (e) {
                if(!(e.message == `funcsObj[split[0].substr(...).toLowerCase(...)] is not a function`)) console.error(e);
            }
        }
    });
});
`use strict`;

const fs = require(`fs`),
    login = require(`facebook-chat-api`),
    readline = require(`readline`),
    { prefix, account, email, password } = require(`../config.json`);

let notexist,
    appState;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cmdFiles = fs.readdirSync(`src/modules`).filter(file => file.endsWith(`.js`));


if (!fs.existsSync(account)) {
    notexist = true;
    appState = { email: email, password: password };
} else appState = { appState: JSON.parse(fs.readFileSync(account, `utf8`)) };

login(appState, { selfListen: true, userAgent: `Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Mobile Safari/537.36` }, (err, api) => { //test account id : 100039047052757 , test account microsft edge: 100038916831294
    if (err) {
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
    api.cmds = new Map();
    for (const file of cmdFiles) {
        const cmd = require(`./modules/${file}`);
        api.cmds.set(cmd.name, cmd);
    }
    if (notexist) fs.writeFileSync(account, JSON.stringify(api.getAppState()));
    api.listenMqtt((err, msg) => {
        if (err) return console.error(err);
        if (!msg.body || !msg.body.startsWith(prefix)) return;
        const argu = msg.body.slice(prefix.length).match(/[^\s"']+|"([^"]*)"/gmi);
        if (!argu) return;
        const args = argu.map(v => v.replace(/["`]/g, ``));
        const cmdName = args.shift().toLowerCase();
        let cmd = api.cmds.get(cmdName);
        if (!cmd) {
            for (const [key, value] of api.cmds.entries()) {
                if (value.aliases && value.aliases.includes(cmdName)) {
                    cmd = api.cmds.get(key);
                    break;
                }
            }
        }
        if (!cmd) return;
        if (cmd.groupOnly && !msg.isGroup) return api.sendMessage(`Komenda działa tylko w grupach`, msg.threadID, null, msg.messageID);
        if (cmd.args > 0 && args.length < cmd.args) {
            let reply = `Nie podałeś poprawnych argumentów!`;

            if (cmd.usage) reply += `\n Poprawne użycie to: ${prefix}${cmd.name} ${cmd.usage}`;
            return api.sendMessage(reply, msg.threadID, null, msg.messageID);
        }
        try {
            cmd.execute(api, msg, args);
        }
        catch (e) {
            console.error(e);
        }
    }
    );
});

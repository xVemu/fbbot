`use strict`;

const fs = require(`fs`),
    login = require(`facebook-chat-api`),
    readline = require(`readline`),
    { prefix, account } = require(`../config.json`);

let notexist,
    appState;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const cmdFiles = fs.readdirSync(`src/modules`).filter(file => file.endsWith(`.js`));


if (!fs.existsSync(`appstate.json`)) {
    notexist = true;
    appState = { email: `kamilox26@gmail.com`, password: `` };
} else appState = { appState: JSON.parse(fs.readFileSync(account, `utf8`)) };

login(appState, { selfListen: true }, (err, api) => { //test account id : 100039047052757 , test account microsft edge: 100038916831294
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
    if (notexist) fs.writeFileSync(`appstate.json`, JSON.stringify(api.getAppState()));
    api.listenMqtt((err, msg) => {
        if (err) return console.error(err);
        if (!msg.body || !msg.body.startsWith(prefix)) return;
        const argu = msg.body.slice(prefix.length).match(/[^\s"']+|"([^"]*)"/gmi);
        if (!argu) return;
        const args = argu.map(v => v.replace(/["`]/g, ``));
        const cmdName = args.shift().toLowerCase();
        const cmd = api.cmds.get(cmdName) || api.cmds.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));
        if (!cmd) return;
        if (cmd.groupOnly && msg.isGroup) return api.sendMessage(`Komenda działa tylko w grupach`, msg.threadID, null, msg.messageID);
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

`use strict`;

const util = require(`util`),
    fs = require(`fs`).promises;


module.exports = {
    name: `usuń`,
    description: `Zabiera komuś możliwość używania everyone.`,
    args: 1,
    groupOnly: false,
    aliases: [`rm`, `remove`, `u`],
    usage: `(everyone lub @ktoś)`,
    async execute(api, msg, args) {
        const { senderID, mentions, threadID, messageID } = msg;
        const config = require(`../../config.json`);
        if (!([`100003748210938`, `100038916831294`, api.getCurrentUserID()].includes(senderID))) return api.sendMessage(`Nie masz dostępu do tej komendy!`, threadID, null, messageID);
        if (args[0].toLowerCase() == `everyone`) {
            const info = await util.promisify(api.getThreadInfo)(threadID);
            info.participantIDs.forEach(v => {
                if (config.permissions.includes(v)) config.permissions.splice(config.permissions.indexOf(v), 1);
            });
            api.sendMessage(`Zabrano wszystkim możliwość !everyone`, threadID, null, messageID);
        } else if (mentions[0] != undefined && config.permissions.includes(mentions[0].id)) {
            config.permissions.splice(config.permissions.indexOf(mentions[0].id), 1);
            api.sendMessage(`Zabrano możliwość !everyone`, threadID, null, messageID);
        }
        await fs.writeFile(`config.json`, JSON.stringify(config));
    }
};
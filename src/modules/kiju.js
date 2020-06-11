`use strict`;

const fs = require(`fs`).promises;

module.exports = {
    name: `kiju`,
    description: `Ile razy kiju był w środku?`,
    args: 0,
    groupOnly: false,
    usage: `<wartość>`,
    async execute(api, msg, args) {
        const { threadID, messageID, senderID } = msg;
        const config = require(`../../config.json`);
        if (args && args.length && [`100003748210938`, `100038916831294`, api.getCurrentUserID()].includes(senderID)) {
            if (isNaN(args[0])) return api.sendMessage(`to nie jest poprawna liczba.`, threadID, null, messageID);
            config.kiju += parseInt(args[0]);
        }
        api.sendMessage(`Kiju był w środku ${config.kiju} razy`, threadID);
        await fs.writeFile(`config.json`, JSON.stringify(config));
    }
};
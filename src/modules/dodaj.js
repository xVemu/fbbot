`use strict`;

const util = require(`util`),
    fs = require(`fs`).promises;


module.exports = {
    name: `dodaj`,
    description: `Pozwala komuś na everyone.`,
    args: 1,
    groupOnly: false,
    aliases: [`add`, `d`],
    usage: `(everyone lub @ktoś)`,
    async execute(api, msg, args) {
        const { senderID, mentions, threadID, messageID } = msg;
        const config = require(`../../config.json`);
        if (!([`100003748210938`, `100038916831294`, api.getCurrentUserID()].includes(senderID))) return api.sendMessage(`Nie masz dostępu do tej komendy!`, threadID, null, messageID);
        if (args[0].toLowerCase() == `everyone`) {
            const info = await util.promisify(api.getThreadInfo)(threadID);
            info.participantIDs.forEach(v => {
                if (!config.permissions.includes(v)) config.permissions.push(v);
            });
            api.sendMessage(`Pozwolono wszystkim na !everyone`, threadID, null, messageID);
        } else if (mentions[0] != undefined && !config.permissions.includes(mentions[0].id)) {
            config.permissions.push(mentions[0].id);
            api.sendMessage(`Pozwolono na !everyone`, threadID, null, messageID);
        }
        await fs.writeFile(`config.json`, JSON.stringify(config));
    }
};
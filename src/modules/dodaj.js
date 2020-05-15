`use strict`;

const { permission } = require(`../index`),
    util = require(`util`),
    fs = require(`fs`).promises;

module.exports = async (message, api, split) => {
    const { senderID, mentions, threadID } = message;
    if ([`100003748210938`, `100038916831294`, api.getCurrentUserID()].includes(senderID)) {
        if (split[0].toLowerCase() == `everyone`) {
            const info = await util.promisify(api.getThreadInfo)(threadID);
            info.participantIDs.forEach(v => {
                if (!permission.includes(v)) permission.push(v);
            });
            await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
            return `Pozwolono wszystkim na everyone`;
        } else if (mentions[0] != undefined) {
            if (!permission.includes(mentions[0].id)) {
                permission.push(mentions[0].id);
                await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
                return `Pozwolono na everyone`;
            }
        }
        return;
    }
};
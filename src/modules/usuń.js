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
                if (permission.includes(v)) permission.splice(permission.indexOf(v), 1);
            });
            await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
            return `Zabroniono wszystkim na everyone`;
        } else if (mentions[0] != undefined) {
            if (permission.includes(mentions[0].id)) {
                permission.splice(permission.indexOf(mentions[0].id), 1);
                await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
                return `Zabroniono na everyone`;
            }
        }
        return;
    }
};
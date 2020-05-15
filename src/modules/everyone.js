`use strict`;

const { permission } = require(`../index`),
    util = require(`util`);

module.exports = async (message, api) => {
    const { threadID, senderID } = message;
    if (permission.includes(senderID)) {
        const info = await util.promisify(api.getThreadInfo)(threadID);
        const mentions = info.participantIDs.map(v => ({ tag: `WSTAWAĆ!`, id: v }));
        return { body: `WSTAWAĆ!`, mentions: mentions };
    }
};
`use strict`;

const { permissions } = require(`../../config.json`),
    util = require(`util`);

module.exports = {
    name: `everyone`,
    description: `Oznacza wszystkich.`,
    args: 0,
    groupOnly: true,
    alises: [`każdy`, `e`],
    async execute(api, msg) {
        const { threadID, senderID, messageID } = msg;
        if (!permissions.includes(senderID)) return api.sendMessage(`Nie masz dostępu do tej komendy!`, threadID, null, messageID);
        const info = await util.promisify(api.getThreadInfo)(threadID);
        const mentions = info.participantIDs.map(v => ({ tag: `WSTAWAĆ!`, id: v }));
        api.sendMessage({ body: `WSTAWAĆ!`, mentions: mentions }, threadID);
    }
};


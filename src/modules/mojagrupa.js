`use strict`;

const { groupOne, groupTwo } = require(`../../config.json`);


module.exports = {
    name: `mojagrupa`,
    description: `Oznacza grupe`,
    args: 0,
    groupOnly: true,
    aliases: [`mg`],
    async execute(api, msg) {
        const { senderID, threadID } = msg;
        let mentions;
        if (groupOne.includes(senderID)) mentions = groupOne.map(v => ({ tag: `WSTAWAĆ!`, id: v }));
        else if (groupTwo.includes(senderID)) mentions = groupTwo.map(v => ({ tag: `WSTAWAĆ!`, id: v }));
        else return;
        api.sendMessage({ body: `WSTAWAĆ!`, mentions: mentions }, threadID);
    }
};
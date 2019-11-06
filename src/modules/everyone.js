`use strict`;

const {permission} = require(`../index`),
    util = require(`util`);

module.exports = async (message, api) => {
    const {threadID, senderID} = message;
    if(permission.includes(senderID)) {
        const info = await util.promisify(api.getThreadInfo)(threadID);
        const mentions = info.participantIDs.map(v => ({ tag: `WSTAWAĆ!`, id: v }));
        return {body: `WSTAWAĆ!`, mentions: mentions};
    }
};
// return new Promise(resolve => {
//     const { threadID, senderID } = message;
//     if(permission.includes(senderID)) {
//         api.getThreadInfo(threadID, (err, info) => {
//             if(err) console.log(err);
//             const mentions = info.participantIDs.map(v => ({tag: `WSTAWAĆ!`, id: v}));
//             resolve({body: `WSTAWAĆ!`, mentions: mentions});
//         });
//     }
// });
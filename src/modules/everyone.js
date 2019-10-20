`use strict`;

const {permission} = require(`../index`);

module.exports = ({threadID, senderID}, api) => {
    return new Promise(resolve => {
        if(permission.includes(senderID)) {
            api.getThreadInfo(threadID, (err, {participantIDs}) => {
                if(err) console.log(err);
                console.log(permission);
                const mentions = participantIDs.map(v => ({tag: `WSTAWAĆ!`, id: v}));
                resolve({body: `WSTAWAĆ!`, mentions: mentions});
            });
        }
    });
};
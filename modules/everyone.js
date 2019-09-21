`use strict`;

const permission = require('../index').permission;

module.exports = (fn, message, api) => {
    console.log(permission);
    if(permission.includes(message.senderID)) {
        api.getThreadInfo(message.threadID, (err, info) => {
            if(err) console.log(err);
            const participantIDs = info.participantIDs;
            let mentions = [];
            participantIDs.map((v) => {
                mentions.push({tag: `WSTAWAĆ!`, id: v});
            });
            fn({body: `WSTAWAĆ!`, mentions: mentions});
        });
    }
}
`use strict`;

const {permission} = require('../index');

module.exports = (fn, {threadID, senderID}, api) => {
    if(permission.includes(senderID)) {
        api.getThreadInfo(threadID, (err, {participantIDs}) => {
            if(err) console.log(err);
            console.log(permission);
            let mentions = [];
            participantIDs.map((v) => {
                mentions.push({tag: `WSTAWAĆ!`, id: v});
            });
            fn({body: `WSTAWAĆ!`, mentions: mentions});
        });
    }
}
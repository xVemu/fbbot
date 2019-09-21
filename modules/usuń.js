`use strict`;

const permission = require('../index').permission;
const fs = require('fs');

module.exports = (fn, message, api, split) => {
    if(message.senderID == api.getCurrentUserID()) {
        if(split[1] == `everyone`) {
            api.getThreadInfo(message.threadID, (err, info) => {
                if(err) console.log(err);
                const participantIDs = info.participantIDs;
                participantIDs.map((v) => {
                    if ((permission.includes(v))) {
                        permission.splice(permission.indexOf(v), 1);
                    }
                });
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Zabroniono wszystkim na everyone`);
            });
        } else if (message.mentions[0] != undefined) {
            if((permission.includes(message.mentions[0].id))) {
                permission.splice(permission.indexOf(message.mentions[0].id), 1);
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Zabroniono na everyone`);
            }
        }
    }
}
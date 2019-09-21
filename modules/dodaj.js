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
                    if (!(permission.includes(v))) {
                        permission.push(v);
                    }
                });
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Pozwolono wszystkim na everyone`);
            });
        } else if (message.mentions[0] != undefined) {
            if(!(permission.includes(message.mentions[0].id))) {
                permission.push(message.mentions[0].id);
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Pozwolono na everyone`);
            }
        }
    }

}
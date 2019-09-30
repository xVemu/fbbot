`use strict`;

const {permission} = require('../index');
const fs = require('fs');

module.exports = (fn, {senderID, mentions, threadID}, api, [, splitf]) => {
    if(senderID == api.getCurrentUserID()) {
        if(splitf == `everyone`) {
            api.getThreadInfo(threadID, (err, {participantIDs}) => {
                if(err) console.log(err);
                participantIDs.map((v) => {
                    if ((permission.includes(v))) {
                        permission.splice(permission.indexOf(v), 1);
                    }
                });
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Zabroniono wszystkim na everyone`);
            });
        } else if (mentions[0] != undefined) {
            if((permission.includes(mentions[0].id))) {
                permission.splice(permission.indexOf(mentions[0].id), 1);
                fs.writeFileSync('priviliges.json', JSON.stringify(permission));
                fn(`Zabroniono na everyone`);
            }
        }
    }
}
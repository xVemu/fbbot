`use strict`;

const {permission} = require(`../index`),
    fs = require(`fs`);

module.exports = ({senderID, mentions, threadID}, api, [, splitf]) => {
    return new Promise(resolve => {
        if(senderID == api.getCurrentUserID()) {
            if(splitf == `everyone`) {
                api.getThreadInfo(threadID, (err, {participantIDs}) => {
                    if(err) console.log(err);
                    participantIDs.foreach(v => {
                        if ((permission.includes(v))) {
                            permission.splice(permission.indexOf(v), 1);
                        }
                    });
                    fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                    resolve(`Zabroniono wszystkim na everyone`);
                });
            } else if (mentions[0] != undefined) {
                if((permission.includes(mentions[0].id))) {
                    permission.splice(permission.indexOf(mentions[0].id), 1);
                    fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                    resolve(`Zabroniono na everyone`);
                }
            }
        }
    });
};
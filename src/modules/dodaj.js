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
                        if (!(permission.includes(v))) {
                            permission.push(v);
                        }
                    });
                    fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                    resolve(`Pozwolono wszystkim na everyone`);
                });
            } else if (mentions[0] != undefined) {
                if(!(permission.includes(mentions[0].id))) {
                    permission.push(mentions[0].id);
                    fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                    resolve(`Pozwolono na everyone`);
                }
            }
        }
    });
};
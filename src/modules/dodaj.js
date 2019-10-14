`use strict`;

const {permission} = require(`../index`),
    fs = require(`fs`);

module.exports = (fn, {senderID, mentions, threadID}, api, [, splitf]) => {
    if(senderID == api.getCurrentUserID()) {
        if(splitf == `everyone`) {
            api.getThreadInfo(threadID, (err, {participantIDs}) => {
                if(err) console.log(err);
                participantIDs.map((v) => {
                    if (!(permission.includes(v))) {
                        permission.push(v);
                    }
                });
                fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                fn(`Pozwolono wszystkim na everyone`);
            });
        } else if (mentions[0] != undefined) {
            if(!(permission.includes(mentions[0].id))) {
                permission.push(mentions[0].id);
                fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
                fn(`Pozwolono na everyone`);
            }
        }
    }

};
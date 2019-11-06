`use strict`;

const {permission} = require(`../index`),
    util = require(`util`),
    fs = require(`fs`).promises;

module.exports = async (message, api, split) => {
    const { senderID, mentions, threadID } = message;
    if (senderID == api.getCurrentUserID() || `100038916831294`) {
        if(split[1].toLowerCase() == `everyone`) {
            const info = await util.promisify(api.getThreadInfo)(threadID);
            info.participantIDs.forEach(v => {
                if(!permission.includes(v)) permission.push(v);
            });
            await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
            return `Pozwolono wszystkim na everyone`;
        } else if(mentions[0] != undefined) {
            if (!permission.includes(mentions[0].id)) {
                permission.push(mentions[0].id);
                await fs.writeFile(`priviliges.json`, JSON.stringify(permission));
                return `Pozwolono na everyone`;
            }
        }
        return;
    }
};

// return new Promise(resolve => {
//     const { senderID, mentions: [mention], threadID } = message;
//     if(senderID == api.getCurrentUserID()) {
//         if(split[1] == `everyone`) {
//             api.getThreadInfo(threadID, (err, info) => {
//                 if(err) console.log(err);
//                 info.participantIDs.foreach(v => {
//                     if (!(permission.includes(v))) {
//                         permission.push(v);
//                     }
//                 });
//                 fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
//                 resolve(`Pozwolono wszystkim na everyone`);
//             });
//         } else if (mention != undefined) {
//             if(!(permission.includes(mention.id))) {
//                 permission.push(mention.id);
//                 fs.writeFileSync(`priviliges.json`, JSON.stringify(permission));
//                 resolve(`Pozwolono na everyone`);
//             }
//         }
//     }
// });
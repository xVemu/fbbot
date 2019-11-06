`use strict`;
const util = require(`util`);

module.exports = async (message, api) => {
    const info = await util.promisify(api.getThreadInfo)(message.threadID);
    return `Odkąd mnie dodano napisano ${info.messageCount} wiadomości`;
    // return new Promise(resolve => {
    //     api.getThreadInfo(message.threadID, (err, info) => {
    //         if(err) console.error(err);
    //         resolve(`Odkąd mnie dodano napisano ${info.messageCount.toString()} wiadomości`);
    //     });
    // });
};
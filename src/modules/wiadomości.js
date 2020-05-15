`use strict`;
const util = require(`util`);

module.exports = async (message, api) => {
    const info = await util.promisify(api.getThreadInfo)(message.threadID);
    return `Odkąd mnie dodano napisano ${info.messageCount} wiadomości`;
};
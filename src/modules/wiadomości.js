`use strict`;
const util = require(`util`);

module.exports = {
    name: `wiadomości`,
    description: `Wysyła ilość wiadomości`,
    args: 0,
    groupOnly: false,
    aliases: [`w`, `messages`],
    async execute(api, msg) {
        const info = await util.promisify(api.getThreadInfo)(msg.threadID);
        api.sendMessage(`Odkąd mnie dodano napisano ${info.messageCount} wiadomości`, msg.threadID);
    }
};
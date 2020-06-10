`use strict`;


module.exports = {
    name: `systemy`,
    description: `Wysyła link do strony z systemów`,
    args: 0,
    groupOnly: false,
    aliases: [`sys`],
    async execute(api, msg) {
        const { threadID, messageID } = msg;
        api.sendMessage(`89.234.201.10/TIG19/`, threadID, null, messageID);
    }
};
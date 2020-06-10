`use strict`;

module.exports = {
    name: `moneta`,
    description: `Rzut monetą`,
    args: 0,
    groupOnly: false,
    aliases: [`coinflip`, `m`],
    async execute(api, msg) {
        const { threadID, messageID } = msg;
        api.sendMessage((Math.floor(Math.random() * 2) == 0) ? `orzeł` : `reszka`, threadID, null, messageID);
    }
};
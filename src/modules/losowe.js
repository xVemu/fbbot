`use strict`;

module.exports = {
    name: `losowe`,
    description: `Losuje liczbe z danego przedziału`,
    args: 1,
    groupOnly: false,
    aliases: [`random`],
    usage: `<zakres>`,
    async execute(api, msg, args) {
        const { threadID, messageID } = msg;
        if (isNaN(args[0])) return api.sendMessage(`Niepoprawny zakres`, threadID, null, messageID);
        api.sendMessage((Math.floor(Math.random() * args[0]) + 1).toString(), threadID, null, messageID);
    }
};
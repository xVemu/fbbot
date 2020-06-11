`use strict`;

module.exports = {
    name: `apka`,
    description: `Wysyła link do mobilnej aplikacji ZSME`,
    args: 0,
    groupOnly: false,
    aliases: [`app`, `zsme`],
    async execute(api, msg) {
        const { threadID, messageID } = msg;
        api.sendMessage(`https://play.google.com/store/apps/details?id=pl.vemu.zsme`, threadID, null, messageID);
    }
};
`use strict`;

const axios = require(`axios`).default,
    https = require(`https`);

module.exports = {
    name: `piesek`,
    description: `Wysyła losowe zdjęcie kotka.`,
    args: 0,
    groupOnly: false,
    aliases: [`doggo`, `p`],
    async execute(api, msg) {
        const end = api.sendTypingIndicator(msg.threadID);
        const { data: { 0: { url } } } = await axios.get(`https://api.thedogapi.com/v1/images/search`);
        https.get(url).on(`response`, stream => {
            end();
            api.sendMessage({ attachment: stream }, msg.threadID);
        });
    }
};
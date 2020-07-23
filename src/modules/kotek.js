`use strict`;

const axios = require(`axios`).default,
    https = require(`https`);


module.exports = {
    name: `kotek`,
    description: `Wysyła losowe zdjęcie kotka.`,
    args: 0,
    groupOnly: false,
    alises: [`kitty`, `k`],
    async execute(api, msg) {
        const end = api.sendTypingIndicator(msg.threadID);
        const { data: { 0: { url } } } = await axios.get(`https://api.thecatapi.com/v1/images/search`);
        https.get(url).on(`response`, stream => {
            end();
            api.sendMessage({ attachment: stream }, msg.threadID);
        });
    }
};
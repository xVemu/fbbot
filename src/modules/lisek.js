`use strict`;

const axios = require(`axios`).default,
    https = require(`https`);


module.exports = {
    name: `lisek`,
    description: `Wysyła losowe zdjęcie lisa.`,
    args: 0,
    groupOnly: false,
    alises: [`foxy`, `l`],
    async execute(api, msg) {
        const end = api.sendTypingIndicator(msg.threadID);
        const { data: { image } } = await axios.get(`https://randomfox.ca/floof/`);
        https.get(image).on(`response`, stream => {
            end();
            api.sendMessage({ attachment: stream }, msg.threadID);
        });
    }
};
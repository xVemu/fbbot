`use strict`;

const axios = require(`axios`).default,
    fsp = require(`fs`).promises,
    fs = require(`fs`);

module.exports = {
    name: `piesek`,
    description: `Wysyła losowe zdjęcie kotka.`,
    args: 0,
    groupOnly: false,
    aliases: [`doggo`, `p`],
    async execute(api, msg) {
        const end = api.sendTypingIndicator(msg.threadID);
        const { data: { 0: { url } } } = await axios.get(`https://api.thedogapi.com/v1/images/search`);
        const { data } = await axios.get(url, { responseType: `arraybuffer` });
        await fsp.writeFile(`doggo.jpg`, data);
        const attachments = { attachment: fs.createReadStream(`doggo.jpg`) };
        end();
        api.sendMessage(attachments, msg.threadID);
        await fsp.unlink(`doggo.jpg`);
    }
};
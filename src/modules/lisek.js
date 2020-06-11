`use strict`;

const axios = require(`axios`).default,
    fs = require(`fs`),
    fsp = require(`fs`).promises;


module.exports = {
    name: `lisek`,
    description: `Wysyła losowe zdjęcie lisa.`,
    args: 0,
    groupOnly: false,
    alises: [`foxy`, `l`],
    async execute(api, msg) {
        const end = api.sendTypingIndicator(msg.threadID);
        const { data: { image } } = await axios.get(`https://randomfox.ca/floof/`);
        const { data } = await axios.get(image, { responseType: `arraybuffer` });
        await fsp.writeFile(`foxy.jpg`, data);
        const attachments = { attachment: fs.createReadStream(`foxy.jpg`) };
        end();
        api.sendMessage(attachments, msg.threadID);
        await fsp.unlink(`foxy.jpg`);
    }
};
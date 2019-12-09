`use strict`;

const request = require(`request-promise-native`),
    fsp = require(`fs`).promises,
    fs = require(`fs`);

module.exports = async (message, api) => {
    const end = api.sendTypingIndicator(message.threadID);
    const json = await request({ uri: `https://randomfox.ca/floof/`, json: true });
    const imgbody = await request({ uri: json.image, encoding: `binary` });
    await fsp.writeFile(`foxy.png`, imgbody, `binary`);
    const attachments = { attachment: fs.createReadStream(`foxy.png`) };
    await fsp.unlink(`foxy.png`);
    end();
    return attachments;
};
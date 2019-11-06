`use strict`;

const request = require(`request-promise-native`),
    fsp = require(`fs`).promises,
    fs = require(`fs`);

module.exports = async (message, api) => {
    const end = api.sendTypingIndicator(message.threadID);
    const [json] = await request({ uri: `https://api.thedogapi.com/v1/images/search`, followAllRedirects: true, json: true });
    const imgbody = await request({ uri: json.url, encoding: `binary` });
    await fsp.writeFile(`doggy.png`, imgbody, `binary`);
    const attachments = { attachment: fs.createReadStream(`doggy.png`) };
    await fsp.unlink(`doggy.png`);
    end();
    return attachments;
};
// return new Promise(resolve => {
//     const end = api.sendTypingIndicator(message.threadID);
//     request({url: `https://api.thedogapi.com/v1/images/search`, followAllRedirects: true}, (error, _response, body) => {
//         if(error) console.log(error);
//         const [json] = JSON.parse(body);
//         request(json.url).pipe(fs.createWriteStream(`doggy.png`)).on(`close`, () => {
//             const attachments = {attachment: fs.createReadStream(`doggy.png`)};
//             resolve(attachments);
//             fs.unlinkSync(`doggy.png`);
//             end();
//         });
//     });
// });
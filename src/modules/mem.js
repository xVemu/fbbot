`use strict`;

const axios = require(`axios`).default,
    cheerio = require(`cheerio`),
    fsp = require(`fs`).promises,
    fs = require(`fs`);


module.exports = {
    name: `mem`,
    description: `Wysyła losowy mem.`,
    args: 0,
    groupOnly: false,
    aliases: [`meme`],
    async execute(api, msg) {
        const { threadID, messageID } = msg;
        const end = api.sendTypingIndicator(threadID);
        const { data } = await axios.get(`https://kwejk.pl/losowy`);
        const $ = cheerio.load(data);
        const text = $(`.box.fav.picture.full`).children(`.content`).children(`h1`).text();
        const imgurl = $(`.full-image`).attr(`src`);
        if (imgurl === undefined) api.sendMessage(`Wystąpił błąd`, threadID, null, messageID);
        else {
            const imgbody = await axios.get(imgurl, { responseType: `arraybuffer` });
            await fsp.writeFile(`meme.png`, imgbody.data);
            const msg = { attachment: fs.createReadStream(`meme.png`), body: text };
            await fsp.unlink(`meme.png`);
            end();
            api.sendMessage(msg, threadID);
        }
    }
};
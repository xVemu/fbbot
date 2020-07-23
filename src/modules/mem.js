`use strict`;

const axios = require(`axios`).default,
    https = require(`https`),
    cheerio = require(`cheerio`);


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
            https.get(imgurl).on(`response`, stream => {
                end();
                api.sendMessage({ attachment: stream, body: text }, msg.threadID);
            });
        }
    }
};
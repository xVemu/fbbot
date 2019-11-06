`use strict`;
const request = require(`request-promise-native`),
    cheerio = require(`cheerio`),
    fsp = require(`fs`).promises,
    fs = require(`fs`);

module.exports = async (message, api) => {
    const end = api.sendTypingIndicator(message.threadID);
    const $ = await request({ uri: `https://kwejk.pl/losowy`, transform: body => cheerio.load(body) });
    const text = $(`.box.fav.picture.full`).children(`.content`).children(`h1`).text();
    const imgurl = $(`.full-image`).attr(`src`);
    if(imgurl === undefined) return `Wystąpił błąd`;
    else {
        const imgbody = await request({ uri: imgurl, encoding: `binary` });
        await fsp.writeFile(`meme.png`, imgbody, `binary`);
        const msg = {attachment: fs.createReadStream(`meme.png`), body: text};
        fsp.unlink(`meme.png`);
        end();
        return msg;
    }
};
// return new Promise(resolve => {
//     const end = api.sendTypingIndicator(message.threadID);
//     request(`https://kwejk.pl/losowy`, (error, _response, body) => {
//         if(error) console.log(error);
//         const $ = cheerio.load(body);
//         const text = $(`.box.fav.picture.full`).children(`.content`).children(`h1`).text();
//         const imgurl = $(`.full-image`).attr(`src`);
//         if(imgurl === undefined) {
//             resolve(`Wystąpił błąd`);
//             end();
//         } else {
//             request(imgurl).pipe(fs.createWriteStream(`meme.png`)).on(`close`, () => {
//                 const msg = {attachment: fs.createReadStream(`meme.png`), body: text};
//                 resolve(msg);
//                 fs.unlinkSync(`meme.png`);
//                 end();
//             });
//         }
//     });
// });
`use strict`;

const request = require(`request`),
    fs = require(`fs`);

module.exports = () => {
    return new Promise(resolve => {
        request({url: `https://api.thedogapi.com/v1/images/search`, followAllRedirects: true}, (error, _response, body) => {
            if(error) console.log(error);
            const {url} = JSON.parse(body)[0];
            request(url).pipe(fs.createWriteStream(`doggy.png`)).on(`close`, () => {
                const attachments = {attachment: fs.createReadStream(`doggy.png`)};
                resolve(attachments);
                fs.unlinkSync(`doggy.png`);
            });
        });
    });
};
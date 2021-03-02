'use strict';
const cookie_chrome = require(`../appstate.json`); //Manually export facebook.com and messenger.com cookies using http://www.editthiscookie.com/
let cookie = [];

for (let cch of cookie_chrome) {
    let c = Object.assign({}, cch);

    // convert to appState key/value
    c.key = c.name;
    c.domain = c.domain.replace(/^\./, ``);

    cookie.push(c);
}

require(`fs`).writeFileSync(`../appstate.json`, JSON.stringify(cookie));
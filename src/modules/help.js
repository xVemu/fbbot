`use strict`;

const {funcs} = require(`../index`);

module.exports = (fn) => {
    let msg = ``;
    funcs.map((v) => {
        msg += `!` + v + `\n`;
    });
    fn(msg);
};
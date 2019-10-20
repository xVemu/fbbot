`use strict`;

const {funcs} = require(`../index`);

module.exports = () => {
    return new Promise(resolve => {
        const msg = funcs.reduce((acc, value) => acc += `!${value}\n`, ``);
        resolve(msg);
    });
};
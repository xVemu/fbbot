`use strict`;

const {funcs} = require(`../index`);

module.exports = async () => `!` + funcs.join(`\n!`);
// {
//     const msg = funcs.join(`\n!`);
//     return `!` + msg;
// };
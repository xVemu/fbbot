`use strict`;

const index = require('../index');

module.exports = (fn) => {
    let msg = "";
    funcs = index.funcs;
    funcs.map((v) => {
        msg += "!" + v + "\n";
    });
    fn(msg);
}
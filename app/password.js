// -----------------------------------------------------------------
// Password encryption: https://www.npmjs.com/package/bcrypt
// -----------------------------------------------------------------
const bcrypt = require('bcryptjs');

var password = {
    hash: function(password, callback) {
        bcrypt.hash(password, 10, callback/*function(err, hash) {}*/);
    },

    compare: function(password, hash, callback) {
        bcrypt.compare(password, hash, callback /*function(err, res) {}*/);
    }
}

module.exports = password;
var password = require('./app/password');

var passwd = process.argv[2];

var hash = password.hash(passwd, function(err, hash) {
    if (err) throw err;
    console.log('Hash: '+hash);

    password.compare(passwd, hash, function(err, res) {
        if (res) console.log("Compare ok");
        else console.log("Error: "+ err);
    });
});
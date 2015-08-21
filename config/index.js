var nconf = require('nconf');
var join = require('path').join;

var ENV = process.env.NODE_ENV;

nconf.argv()
    .env()
    .file({ file: join(__dirname, ENV + '.json') })
    .file({ file: join(__dirname, 'index.json') });

module.exports = nconf;
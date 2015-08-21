var crypto = require("crypto");
var network = require("./network");
var config = require("../config");

var negotiators = [];

exports.getNegotiators = function () {
    console.log(negotiators.length);
    return negotiators;
};

exports.addNegotiator = function (cb) {
    var name = crypto.randomBytes(3).toString('hex'),
        pass = '123',
        options= {
            host: config.get('API:host'),
            port: config.get('API:port'),
            path: config.get('API:authUrl'),
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache,max-age=0",
                "Cache": "no-cache"
            }
        },
        body = {
            username: name,
            password: pass
        };

    console.log(options);
    network.postJSON(options, JSON.stringify(body), function (status, data) {
        console.log(status, data);
        if (data) negotiators.push(data);

        cb(data);
    });
};

var crypto = require("crypto");
var network = require("./network");
var config = require("../config");
//var SockJS = require("sockjs-client");
var SockJS = require('sockjs-client-node');

var negotiators = [];

function getSid(str) {
    var reg = /sid=\S+/,
        resultArray = str.match(reg)[0];

    return resultArray.slice(4, -1);
}
exports.getNegotiators = function () {
    console.log(negotiators.length);
    return negotiators;
};

exports.addNegotiator = function (user) {
    negotiators.push(user);
};

exports.logInAndStart = function (data, cb) {
    var userName = data.name,
        password = data.password,
        options = {
            host: config.get('API:host'),
            port: config.get('API:port'),
            path: config.get('API:logInUrl'),
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache,max-age=0",
                "Cache": "no-cache"
            }
        },
        body = {
            username: userName,
            password: password
        };
    network.postJSON(options, JSON.stringify(body), function (status, data, headers) {
        console.log(status, data);
        var user = {},
            cookies = headers['set-cookie'],
            sid = getSid(cookies[0]);

        user.sid = sid;
        if (typeof data == "string") {
            data = parseJSON(data);
        }
        user.data = data
        cb(user);
    });
};

exports.newUserRegistration = function (cb) {
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

    network.postJSON(options, JSON.stringify(body), function (status, data) {
        var user;
        if (typeof data == "string") {
            data = parseJSON(data);
        }
        user = data.user;
        user.password = '123';
        cb(user);
    });
};

exports.getSocketKey = function (data, cb) {
    var sid = data.sid,
        options = {
            host: config.get('API:host'),
            port: config.get('API:port'),
            path: config.get('API:getSocketKeyUrl'),
            method: 'POST',
            headers: {
                "Cookie": "sid=" + sid,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache,max-age=0",
                "Cache": "no-cache"
            }
        };
    network.postJSON(options, null, function (status, data) {
        console.log(status, data);

        cb(data);
    });
};

exports.setSocketConnection = function (socketKey, cb) {
    console.log(socketKey);
    var client = SockJS.create("http://localhost:3000");
    client.on('connection', function () {
        console.log("connection is established");
    });
    client.on('data', function (msg) {
        console.log(msg);
    });
    client.on('error', function (e) {
        console.error("something went wrong");
    });
    client.write("Have some text you mighty SockJS server!");
};

function parseJSON(raw) {
    var parsedResponse,
        response = (raw !== '') ? raw : '{}';
    try {
        parsedResponse = JSON.parse(response);
    } catch (e) {
        console.error('Server Response is not JSON');
        console.error(e);
    }
    return parsedResponse;
}
var crypto = require("crypto");
var network = require("./network");
var config = require("../config");
var Connection = require("./connection");
var negotiators = {};
var connections = {};


function getSid(str) {
    var reg = /sid=\S+/,
        resultArray = str.match(reg)[0];

    return resultArray.slice(4, -1);
}
exports.getNegotiators = function () {
    console.log("getNegotiators: ", negotiators.length);
    return negotiators;
};

exports.addNegotiator = function (user) {
    console.log("addNegotiator: ", user);

    negotiators[user.id] = user;
};

exports.logIn = function (user, cb) {
    var options = {
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
            username: user.username,
            password: user.password
        };
    network.postJSON(options, JSON.stringify(body), function (status, data, headers) {
        var cookies = headers['set-cookie'],
            sid = getSid(cookies[0]);

        console.log("SID for " + user.username + ": " + sid);
        user.sid = sid;
        if (status == 200){
            cb(null, user);
        } else {
            cb({
                errorStatus: status
            });
        }
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
        if (status == 200){
            cb(null, user);
        } else {
            cb({
                errorStatus: status
            });
        }
    });
};

exports.getSocketKey = function (id, cb) {
    var negotiator = negotiators[id],
        sid = negotiator.sid,
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
        if (typeof data == "string") {
            data = parseJSON(data);
        }
        if (status == 200){
            cb(null, data.socketKey);
        } else {
            cb({
                errorStatus: status
            });
        }
    });
};

exports.setSocketConnection = function (socketKey, cb) {
    console.log("setSocketConnection");
    console.log(socketKey);

    var options = {
            socketKey: socketKey,
            prefix: 'http://localhost:3000/chatConnection',
            socketOpts: {debug: true}
        };
    connections[socketKey] = new Connection(options);

    cb(null, connections[socketKey]);
};

exports.sentMessage = function (connection, cb) {
    var count = 0,
        int = setInterval(function(){ timer() }, 1000);

    function timer() {
        connection.socket.send(JSON.stringify({text: count + " dsfdsfsdf"}));
        count ++;
        if (count >= 10) stopTimer();
    }

    function stopTimer() {
        clearInterval(int);
    }

    cb(null);
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
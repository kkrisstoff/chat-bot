//var async = require('async');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
//require('sockjs-client-node');
var SockJS = require("sockjs-client");

module.exports = Connection = function(options) {
    this.options = options || {};

    this.init();
};

util.inherits(Connection, EventEmitter);

['CONNECTING', 'OPEN', 'CLOSED'].forEach(function(status) {
    Connection.prototype[status] = status;
});

Connection.prototype.init = function() {
    this.socket = new SockJS(this.options.prefix, undefined, this.options.socketOpts);
    this.status = this.CONNECTING;

    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
//    this.socket.onclose = this.onClose.bind(this);
};

Connection.prototype.onOpen = function() {
    console.log("socket onOpen");

    this.socket.send(JSON.stringify({
        type: 'handshake',
        socketKey: this.options.socketKey
    }));
};

Connection.prototype.onMessage = function(e) {
    var message = JSON.parse(e.data);
    console.log("message:", message);

    if (this.status == this.CONNECTING) {
        if (message.type == 'handshake') {
            console.log("handshake received");

            this.status = this.OPEN;
            this.emit('open');
        } else {
            throw new Error("First response must be handshake: " + e.data);
        }
    } else {
        //this.emit('message', message);
    }
};
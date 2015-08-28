var async = require('async');
var express = require('express');
var router = express.Router();
var newUserRegistration = require("../chatbot").newUserRegistration;
var addNegotiator = require("../chatbot").addNegotiator;
var getNegotiators = require("../chatbot").getNegotiators;
var logIn = require("../chatbot").logIn;
var getSocketKey = require("../chatbot").getSocketKey;
var setSocketConnection = require("../chatbot").setSocketConnection;
var sentMessage = require("../chatbot").sentMessage;

/* GET home page. */
router.get('/', function(req, res, next) {
    var initial = {
            users: getNegotiators()
        };

    res.render('index', {
        title: 'Home',
        initialState: JSON.stringify(initial)
  });
});

router.post('/api/addNegotiator', function(req, res, next) {
    async.waterfall([
        function(callback) {
            newUserRegistration(callback);
        },
        function(user, callback) {
            logIn(user, callback);
        }
    ], function (err, resultUser) {
        if (err) return res.json(err);

        addNegotiator(resultUser);
        res.json(resultUser);
    });
});

router.post('/api/connectAndStart', function(req, res, next) {
    var body = req.body,
        id = body.id;

    async.waterfall([
        function(callback) {
            getSocketKey(id, callback);
        },
        function(socketKey, callback) {
            setSocketConnection(socketKey, callback);
        },
        function(connection, callback) {
            sentMessage(connection, callback);
        }
    ], function (err, resultUser) {
        if (err) {
            return res.json({
                started: false,
                error: err
            });
        }

        res.json({
            started: true,
            user: resultUser
        });
    });
});

router.post('/api/sentMessage', function(req, res, next) {
    sentMessage(function () {
        res.json({
            test: "test"
        });
    })

});

module.exports = router;
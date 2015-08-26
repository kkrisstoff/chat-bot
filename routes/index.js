var express = require('express');
var router = express.Router();
var newUserRegistration = require("../chatbot").newUserRegistration;
var addNegotiator = require("../chatbot").addNegotiator;
var getNegotiators = require("../chatbot").getNegotiators;
var logInAndStart = require("../chatbot").logInAndStart;
var getSocketKey = require("../chatbot").getSocketKey;
var setSocketConnection = require("../chatbot").setSocketConnection;

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

router.get('/api/getNegotiator', function(req, res, next) {
    newUserRegistration(function (user) {

        addNegotiator(user);
        res.json(user);
    });
});

router.post('/api/logInAndStart', function(req, res, next) {
    var body = req.body,
        data = {
            username: body.name,
            password: body.password
        };
    console.log(body, data);

    logInAndStart(body, function (user) {
        getSocketKey(user, function (data) {
            console.log(data);
            setSocketConnection(data.socketKey)
        });
        res.json({
            user: user
        });
    });

});

module.exports = router;
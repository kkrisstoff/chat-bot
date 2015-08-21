var express = require('express');
var router = express.Router();
var addNegotiator = require("../chatbot").addNegotiator;
var getNegotiators = require("../chatbot").getNegotiators;

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
    addNegotiator(function () {
        res.redirect('/');
    });
});
router.get('/api/getNegotiator', function(req, res, next) {
    addNegotiator(function (negotiator) {
        if (typeof negotiator == "string"){
            negotiator = JSON.parse(negotiator);
        }
        res.json(negotiator);
    });

});

module.exports = router;
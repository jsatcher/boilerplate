var config = require('../../config');
var url = require('url');
var util = require('util');
var request = require('request');

function callback(res, err, data) {
    if (err) {
        util.error(err);
        res.status(statusCode).end(err);
    }
    else {
        res.json(data.body);
    }
}

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('home');
    });

    app.get('/article', function(req, res) {
        res.render('article');
    });
}

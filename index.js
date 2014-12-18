var config = require('./config');
var util = require('util');
var express = require('express');
var hbs = require('express-handlebars');
var bodyParser = require('body-parser');
var routes = require('./src/routes');
var app = express();

app.engine('handlebars', hbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(config.get('PORT'), function() {
    var info = this.address();
    util.log('Express server listening on ' + info.address
              + ':' + info.port);
});
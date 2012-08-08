var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    hbs = require('hbs'),
    path = require('path'),
    Parser = require('./parser');
    // md = require("node-markdown").Markdown,
    // hl = require('highlight').Highlight,

var server = express();
server.use(express.logger('dev'));
server.set('views', path.normalize(__dirname + '/views'));
server.set('view engine', 'hbs');

function layout(req,res,next) {
    // if (req.header('X-Requested-With')==='XMLHttpRequest') {
        res.locals({layout:false});
    // }
    next();
}

server.get('/', layout, function(req, res) {
    var str = fs.readFileSync('sample.blp','UTF8');
    var doc = Parser.parse(str);
    console.log(JSON.stringify(doc,null,'   '));
    res.render('blueprint.hbs',doc);
});

server.listen(3000);
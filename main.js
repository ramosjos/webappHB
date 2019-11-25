var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });


app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));

app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql); 

app.use('/', express.static('public'));
app.use('/home', require('./home.js'));
app.use('/games', require('./games.js'));
app.use('/results', require('./results.js'));
app.use('/standings', require('./standings.js'));
app.use('/users', require('./users.js'));
app.use('/messages', require('./messages.js'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

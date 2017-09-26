
// See https://gist.github.com/smebberson/1581536 for a simple login handling

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(session({ secret: 'example', resave: false, saveUninitialized : true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(checkAuth);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('pages/index.ejs');
  //res.send('Hello World!')
})

app.get('/norrtorp', function (req, res) {
  res.render('pages/norrtorp/index.ejs');
})

app.post('/norrtorp', function (req, res) {
  if (req.body.password && req.body.password === '1234') {
    req.session.authenticated = true;
    res.redirect('/norrtorp/adresser');
  } else {
    req.flash('error', 'Incorrect password');
    res.redirect('/norrtorp');
  }
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// --------------------
function checkAuth(req, res, next) {
    console.log('checkAuth ' + req.url);
  
    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if (req.url === '/secure' && (!req.session || !req.session.authenticated)) {
      res.render('unauthorised', { status: 403 });
      return;
    }
  
    next();  
}
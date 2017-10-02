
// See https://gist.github.com/smebberson/1581536 for a simple login handling

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var password = require('./app/password');

var title = 'Not Set';

app.set('port', (process.env.PORT || 5000));

app.use(cookieParser());
app.use(session({ secret: 'example', resave: false, saveUninitialized : true }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(checkAuth);
app.use(setTitle);

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('pages/index.ejs', setRenderVars({}));
})

//
// ----------------------------------- Norrtorp stuff
//
app.get('/norrtorp', function (req, res) {
  res.render('pages/norrtorp/index.ejs', setRenderVars({}));
})

app.get('/norrtorp/adresser', function (req, res) {
  res.render('pages/norrtorp/adresser.ejs', setRenderVars({}));
})

app.post('/norrtorp', function (req, res) {
  if (req.body.password ) {
    password.compare(req.body.password, '$2a$10$F1bjmkmY7jc8ZZxA9waUJ.t8HZXir.d20V8r2zC17q4WiQvtI9IJi', function(err, ok) {//req.body.password === '1234') {
      if (ok) {
        req.session.authenticated = true;
        res.redirect('/norrtorp/adresser');
      } else {
        //req.flash('error', 'Incorrect password');
        res.redirect('/norrtorp');
      }
    });
  } else {
    //req.flash('error', 'Incorrect password');
    res.redirect('/norrtorp');
  }
})

app.post('/norrtorp/newmail', function (req, res) {
  console.log('Got a new email message');
  console.log(req);
  console.log(req.body);
  res.render('pages/norrtorp/adresser.ejs', setRenderVars({}));
})

app.get('/norrtorp/logout', function (req, res) {
  delete req.session.authenticated;
  res.redirect('/norrtorp');
})


//
// ----------------------------------- Start the APP
//
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// -----------------------------------------------------------------
// Functions
// -----------------------------------------------------------------
function setRenderVars(obj) {
  obj.pagetitle = title;
  return obj;
}
// -----------------------------------------------------------------
// Express Filters 
// -----------------------------------------------------------------
function setTitle(req, res, next) {
  if (req.url.startsWith('/norrtorp')) {
    title = 'Norrtorp';
    extrascript = '/js/norrtorp.js';
  } else {
    title = 'Boghammar';    
    extrascript = '/js/boghammar.js';
  }
  next();
}
// -----------------------------------------------------------------
function checkAuth(req, res, next) {
    console.log('checkAuth ' + req.url);
  
    // don't serve /secure to those not logged in
    // you should add to this list, for each and every secure url
    if (req.url === '/norrtorp/adresser' && (!req.session || !req.session.authenticated)) {
      res.render('pages/norrtorp/unauthorised.ejs', setRenderVars({ status: 403 }));
      return;
    }
  
    next();  
}

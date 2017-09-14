var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('views/pages/index.ejs');
  //res.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/* eslint-disable import/no-cycle */
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let webRoutes = require('./routes/web');
let apiRoutes = require('./routes/api');
let app = express();
let config = require('./config/request');

// error handler
app.use(function(req, res, next) {
  if (config.MARKETPLACE_ID === '' || config.SECRET === '') {
    res.send(
      'MarketplaceId and secret must be set with your marketplace API credentials'
    );
  } else {
    next();
  }
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(
  session({
    cookieName: 'session',
    secret: 'secret',
    duration: 30 * 60 * 1000,
    sctiveDuration: 50 * 60 * 1000,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: true
  })
);

app.use('/', webRoutes);
app.use('/api', apiRoutes);
app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/config', express.static('config'));
app.use('*', function(req, res) {
  res.render('app/404error');
});
app.listen(process.env.PORT || 4000, function(err, req, res) {
  if (err) {
    res.send('There was no endpoint listening');
  } else {
    console.log('server started on port: ', process.env.PORT || 3000);
  }
});

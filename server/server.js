const express = require('express'),
    app = express(),
    subpath = express(),
    api = require('./api/api'),
    mongoose = require('mongoose'),
    config = require('./config/config'),
    logger = require('./util/logger'),
    passport = require('passport'),
    auth = require('./auth/routes');

mongoose.Promise = global.Promise;
//{dbName: 'gringo', useNewUrlParser: true },
// In testing mode 
mongoose.connect(config.db.url, {useNewUrlParser: true })
.then(
  success => logger.log('MongoDB Connection Successful.' + config.db.url),
  err => logger.error('MongoDB Connection Failed. \n' + err)
);
mongoose.set('useCreateIndex', true);
// removes deprecationWarning

if(config.seed){
  require('./util/seed')
}

require('./middleware/appMiddleware')(app)

app.use(passport.initialize());
require('./auth/passport')(passport);

app.use("/", subpath);

var swagger = require('swagger-node-express').createNew(subpath);
app.use(express.static('docs'));
swagger.setApiInfo({
  title: "Gringo API",
  description: "API to do something, manage something...",
  termsOfServiceUrl: "",
  contact: "support@gringo.com",
  license: "",
  licenseUrl: ""
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/../docs/index.html');
});

app.use('/auth', auth)
app.use('/api',  api)

app.use(function(err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).send('Invalid token')
    return
  }
  logger.error(err.stack)
  res.status(500).send('Oops server error')
})

module.exports = app
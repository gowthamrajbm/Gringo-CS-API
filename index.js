const config = require('./server/config/config'),
    app = require('./server/server'),
    logger = require('./server/util/logger');

app.listen(config.port)
logger.log('listening on http://localhost:' + config.port)
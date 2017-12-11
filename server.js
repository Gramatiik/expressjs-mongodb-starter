'use strict';

const config = require('./config/config.js');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const corsMiddleware = require('cors');
const Promise = require('bluebird');

/**
 * Server startup function
 * @return {Promise<void>}
 */
async function server() {

    console.log(Promise);

    /* Middlewares */
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(corsMiddleware());

    /* Application variables */
    app.set('port', process.env.PORT || config.port || 8000);

    /* Connect to MongoDB */
    mongoose.connect(config.mongoDB.uri, { useMongoClient: true });
    mongoose.Promise = Promise;

    /* Use routes */
    app.use(require('./routes/index.route'));

    /* Send 404 error if no middleware handled the request */
    app.use((req, res, next) => {
        res.status(404).json({ message: "Whoops, you got lost in space :/" });
        next();
    });

    /* start app on port 8000 */
    app.listen(app.get('port'), () => {
        console.log('Started app on port ' + app.get('port'));
    });

    /* close database connection on app close */
    app.on('close', () => db.close());
}

// start server
server();

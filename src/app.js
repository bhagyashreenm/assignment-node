require('dotenv').config();
const { databaseUrl } = require('./config/Database');
const { router } = require('./Routes');
const bodyParser = require('body-parser')
const mongoose =  require('mongoose');
const express = require('express') ;
const cors = require('cors');



async function startServer() {
    const app = express();
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use(cors())
    // Connect to the Database
    await connectToTheDatabase();

    // Initialize express middlewares
    // initializeExpressMiddleware(app);
    app.use('/api/v1', router);

    app.get('/ping', function (req, res) {
        // res.status(200).json({ message: 'pong', status:'200' });  });
        // res.statusCode = 200;
        res.json({ message: 'pong' });  });
    
        
    // Error Handler when no routes are matched
    app.use(function (req, res, next) {
        res.status(404).send({ message: 'Oops!! guess you wandered off to the wrong areas!!' });
        next();
    });

    app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.status(500).json({
                message: err.message
            });
        });


    // Start Server at Port
    const port= parseInt(process.env.PORT) || 8080;
    app.listen(port, () => {
        console.log(`Server started at Port: ${port}`);
    });
}

async function connectToTheDatabase() {
    // TODO: Remove this later.
    console.log(`URL :${databaseUrl}`);
    try {
        const connection = await mongoose.connect(databaseUrl, {});
        console.log('CONNECTED TO DB!!');

        return connection.connection.db;
    } catch (error) {
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', error);
        // If there is error during inital connection to the db, we retry after 5 seconds.
        setTimeout(connectToTheDatabase, 5000);
    }
}




startServer().catch((e) => {
    console.error(e);
});
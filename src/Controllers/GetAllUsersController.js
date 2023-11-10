const user = require('../Models/user');
const redis = require('redis');



async function GetAllUsersController(req, res) {

    try {


        const client = redis.createClient({
            socket: {
                port: process.env.REDIS_PORT,
                host: process.env.REDIS_HOST,
            }
        });

        (async () => {
            // Connect to redis server
            await client.connect();
        })();

        client.on('connect', () => {
            console.log('Connected!');
        });
        
        // Log any error that may occur to the console
        client.on("error", (err) => {
            console.log(`Error:${err}`);
        });

        let data
        const getUsersRedis = await client.get("allUsers");
        if(getUsersRedis){
            console.log(`Data From Redis  : ${getUsersRedis}`);
            return res.status(200).json({ "users": JSON.parse(getUsersRedis) })
        }
        else{
            data = await  user.find({}).exec()
            client.setEx("allUsers", 60, JSON.stringify(data));
        }
        
        return res.status(200).json({ "users": data });
            
        
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = GetAllUsersController
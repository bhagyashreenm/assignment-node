const user = require('../Models/user');
const redis = require('redis');

async function AddUserController(req, res) {

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
        console.log(`Req  : ${req.body.phone}`);
        const {name, phone} = req.body
        if(name && phone){
            console.log(`Name : ${name} && Phone : ${phone}`);
            const userExists = await user.findOne({phone})
            if(userExists){
                console.log(`Req  : ${userExists}`);
                return res.status(400).json({
                    message: `user with phone ${phone} already exists!!`
                })
            }

            const userData = new user({name , phone})
            await userData.save()
            await client.del('allUsers', ((err, rep)=>{
                console.log('Drop Cache key allUsers', rep);
            }))
            return res.status(200).json({
                message: `User successfully added`,
                data: userData
            })
        }else{
            return res.status(400).json({
                message: `Name and Phone is required`
            })
        }
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = AddUserController
const redis = require('redis');
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

client.on("error", (err) => {
    console.log(`Error:${err}`);
});

module.exports = client
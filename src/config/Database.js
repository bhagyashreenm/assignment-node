const dbEnv = process.env.DB_ENV;

const databaseConfig = {
    host: process.env.DATABASE_HOST,
    databaseName: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
};

let dbType = 'mongodb+srv';
if (dbEnv === 'local') dbType = 'mongodb';

// const databaseUrl = `${dbType}://${databaseConfig.username}:${databaseConfig.password}@${databaseConfig.host}`;
const databaseUrl = `mongodb://${process.env.DATABASE_HOST}:27017/docker-node-mongo`;
module.exports = { databaseConfig, databaseUrl };

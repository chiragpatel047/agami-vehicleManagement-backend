const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

const connectRedis = async (io) => {
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter(createAdapter(pubClient, subClient));
    console.log("Connected to Redis");
};

module.exports = connectRedis;

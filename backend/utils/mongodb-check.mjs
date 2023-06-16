import net from 'net';
import { PromiseSocket } from 'promise-socket';
import { parse } from 'url';

const checkMongoDBAvailability = async (mongodbAddress) => {
    if (!mongodbAddress) {
        console.error('MongoDB address is not set!');
        process.exit(1);
    }
    const { hostname, port } = parse(mongodbAddress);
    const socket = new net.Socket()
    const promiseSocket = new PromiseSocket(socket)
    try {
        await promiseSocket .connect(port, hostname);
        console.log('MongoDB is available');
    } catch (error) {
        console.error('MongoDB not available:', error.message);
        process.exit(1);
    } finally {
        promiseSocket .destroy();
    }
};

export default checkMongoDBAvailability;

import schema2rest from './utils/schema2rest.mjs';
import checkMongoDBAvailability from './utils/mongodb-check.mjs';
import dotenv from 'dotenv';

async function main() {
    dotenv.config();
    await checkMongoDBAvailability(process.env.MONGODB_ADDRESS);
    await schema2rest.serve({
        schemaDir: process.env.SCHEMA_DIR,
        mongodbAddress: process.env.MONGODB_ADDRESS,
        port: process.env.BACKEND_PORT
    });
}

main().catch((error) => {
    console.error('An error occurred:', error);
});

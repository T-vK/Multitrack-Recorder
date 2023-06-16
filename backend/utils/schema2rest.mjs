import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import restify from 'express-restify-mongoose';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { createMongooseSchema } from 'convert-json-schema-to-mongoose';

async function loadSchemas(directory) {
    const files = await fs.readdir(directory);
    const jsonFiles = files.filter((file) => path.extname(file) === '.json');
    const rawJsons = await Promise.all(jsonFiles.map(file => fs.readFile(path.join(directory, file))));
    const schemas = rawJsons.map(JSON.parse);
    return schemas;
}

async function createRouter({ schemaDir, schemas, mongodbAddress, mongooseConnection }) {
    const router = express.Router();

    mongoose.set('strictQuery', false);
    mongoose.connect(mongodbAddress, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
  
    const loadedSchemas = schemaDir ? await loadSchemas(schemaDir) : schemas;
    const entitySchemas = loadedSchemas.filter((obj) => obj.type === "array" && obj.items.type === "object");
    const mongooseSchemas = entitySchemas.map(schema => createMongooseSchema({}, schema.items))

    const mongooseModels = mongooseSchemas.map((mongooseSchema, index) => mongoose.model(loadedSchemas[index].title, mongooseSchema));
    
    for (const mongooseModel of mongooseModels) {
        restify.serve(router, mongooseModel);
    }

    return router
}

async function serve({ schemaDir, schemas, mongodbAddress, mongooseConnection, expressApp = express(), port }) {
    expressApp.use(bodyParser.json())
    expressApp.use(methodOverride())
    const router = await createRouter({schemaDir, schemas, mongodbAddress, mongooseConnection});
    expressApp.use(router);
    expressApp.listen(port, () => {
        console.log(`Server up and running at http://localhost:${port}`);
    });
}

export default { createRouter, serve };
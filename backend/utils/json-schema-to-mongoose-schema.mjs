function convertToMongooseSchema(jsonSchema) {
    const mongooseSchema = {};

    for (const [key, value] of Object.entries(jsonSchema.properties)) {
        const { type, format, properties, items } = value;

        if (type === 'string') {
            if (format === 'date-time') {
                mongooseSchema[key] = { type: Date };
            } else {
                mongooseSchema[key] = { type: String };
            }
            } else if (type === 'number') {
                mongooseSchema[key] = { type: Number };
            } else if (type === 'boolean') {
                mongooseSchema[key] = { type: Boolean };
            } else if (type === 'object' && properties) {
                mongooseSchema[key] = convertToMongooseSchema({ properties });
            } else if (type === 'array' && items) {
            if (Array.isArray(items)) {
                mongooseSchema[key] = items.map(item => convertToMongooseSchema({ properties: item }));
            } else {
                mongooseSchema[key] = [convertToMongooseSchema({ properties: items })];
            }
        }
    }

    return mongooseSchema;
}

export default convertToMongooseSchema;
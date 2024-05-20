import { Db, MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.URI_MONGODB;

if (!uri) {
  throw new Error('Mongo DB is offline something went wrong');
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000,
});

export const database = client.db(process.env.MONGODB_DATABASE_NAME);



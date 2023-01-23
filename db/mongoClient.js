import { MongoClient } from 'mongodb';

const CNX_STR = 'mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test'
const DB_NAME = 'test'

const mongoClient = new MongoClient(CNX_STR);
await mongoClient.connect();

export const mongoDatabase = mongoClient.db(DB_NAME)


import { MongoClient } from 'mongodb';
import {MONGOCONECTION} from '../config.js'
import {MONGODB} from '../config.js'


const CNX_STR = MONGOCONECTION
const DB_NAME = MONGODB

const mongoClient = new MongoClient(CNX_STR);
await mongoClient.connect();

export const mongoDatabase = mongoClient.db(DB_NAME)


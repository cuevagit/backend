import createKnexClient from 'knex';
import {mysqlConfig} from './config.js';
import {sqlite3Config} from './config.js';
import createTables from '../db/createTables.js'

export const clienteSql = createKnexClient(mysqlConfig);
export const clienteSqlLite3 = createKnexClient(sqlite3Config);

createTables()

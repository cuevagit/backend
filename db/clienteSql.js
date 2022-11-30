import createKnexClient from 'knex';
import mysqlConfig from './config.js';
import createTables from '../db/createTables.js'

export const clienteSql = createKnexClient(mysqlConfig);

createTables()

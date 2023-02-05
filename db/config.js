
import {MYSQL} from '../config.js'
import {SQLITE} from '../config.js'

export const mysqlConfig = {
    client: 'mysql2',
    connection: MYSQL
}

export const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: SQLITE
    },
    useNullAsDefault: true   
}


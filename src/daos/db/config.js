
import {MYSQL} from '../../config/config.js'
import {SQLITE} from '../../config/config.js'

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


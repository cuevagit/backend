export const mysqlConfig = {
    client: 'mysql2',
    connection: 'mysql://root:cueva1y2*2@localhost:3306/ecommerce'
}

export const sqlite3Config = {
    client: 'sqlite3',
    connection: {
        filename: "./db/ecommerce/mydb.sqlite"
    },
    useNullAsDefault: true   
}


import session from 'express-session'
import MongoStore from 'connect-mongo'

export default function logIn(servidor){
    servidor.use(session({

        store: MongoStore.create({
            //En Atlas connect App :  Make sure to change the node version to 2.2.12:
            mongoUrl: `mongodb+srv://root:12345@cluster0.mqhwyzp.mongodb.net/test`,
        }),
        /* ----------------------------------------------------- */
      
        secret: 'shhhhhhhhhhhhhhhhhhhhh',
        resave: false,
        saveUninitialized: false,
        //ttl: 1//,
        cookie: {
            maxAge: 10000
        } 
      
      }))
}
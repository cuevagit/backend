import Container from "../../container/containerArchivo.js"


class Chat{

    constructor({ id, email, nombre, apellido, edad, alias, avatar,mensaje  }) {
        this._id = id
        this.email = email
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
        this.mensaje = mensaje
    }




    async guardar(objeto) {
            const contenedor = new Container("chat.txt")
            const resul = await contenedor.save(objeto)
            return resul
      }

 }



 export default Chat;

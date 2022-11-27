const { Contenedor } = require("../container/container.js")
const { randomUUID } = require('crypto');
const fs = require("fs");

const chatTest = new Contenedor('chat.txt')


async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await chatTest.saveChat(objeto);
    res.json(objeto)
}

exports.controladorPostChat = controladorPostChat;

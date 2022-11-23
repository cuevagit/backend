const { ContenedorChat } = require("../container/containerChat.js")
const { randomUUID } = require('crypto');
const fs = require("fs");

const chatTest = new ContenedorChat('chat.txt')


async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await chatTest.save(objeto);
    res.json(objeto)
}

exports.controladorPostChat = controladorPostChat;

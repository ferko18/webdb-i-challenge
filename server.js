const express = require('express');

const server = express();
server.use(express.json());

// your code here
const accountsRouter = require('./api/accountsRouter');
server.use("/api/accounts", accountsRouter);

//default router 
server.get("/", (req, res) => {
    res.send(`<h3> hi from accounts api !</h3>`);
    });
    

module.exports = server;
const express = require('express');
const cors = require('cors');
const server = express();
const projectRouter = require('./projects/projectRouter.js');
const actionRouter = require('./actions/actionRouter.js');



server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter);



server.get('/', (req, res) => {
  res.send(`<h2>WEB API SPRINT CHALLENGE!</h2>`)
});

//custom middleware

module.exports = server;
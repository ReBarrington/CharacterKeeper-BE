const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');

// routers
const authenticate = require('./src/auth/authenticate-middleware');
const authRouter = require('./src/auth/auth-router');
const booksRouter = require('./src/schema/books-router');

server.get('/', (req, res) => {
    res.send(`<h2>Working!</h2>`);
  });

server.use(helmet());
server.use(cors());
server.use(express.json()); // built-in middleware, no need to install it

//endpoints

server.use('/auth', authRouter);
server.use('/books', authenticate, booksRouter);

module.exports = server;
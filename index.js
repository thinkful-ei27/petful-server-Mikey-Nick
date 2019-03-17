'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { Dogs, Cats, dogResupply, catResupply } = require('./queue.js');

const { PORT, CLIENT_ORIGIN } = require('./config');
// const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
app.get('/api/cat', (req, res, next) => {
  const cat = Cats.peek();
  if (!cat) {
    catResupply();
    const newCat = Cats.peek();
    return res.send(newCat);
  }
  return res.send(cat)
    .catch(error => {
      error.status(404).send(error.message);
    });
});
app.get('/api/dog', (req, res, next) => {
  const dog = Dogs.peek();
  if (!dog) {
    dogResupply();
    const newDog = Dogs.peek();
    return res.send(newDog);
  } else
    return res.send(dog)
      .catch(error => {
        error.status(404).send(error.message);
      });
});

app.delete('/api/cat', (req, res, next) => {
  Cats.dequeue();
  res.status(204).send();
});

app.delete('/api/dog', (req, res, next) => {
  Dogs.dequeue();
  res.status(204).send();
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  // dbConnect();
  runServer();
}

module.exports = { app };

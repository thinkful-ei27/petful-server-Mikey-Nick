'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

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

const cats = [{
  imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street',
  animal: 'cat'
},
{
  imageURL: 'https://media.licdn.com/dms/image/C4D03AQHZ-6yyqVB_mA/profile-displayphoto-shrink_800_800/0?e=1557360000&v=beta&t=03_sR7NHm_oHgyV-dRjHQ_gtVsQzMZKZjkoJPRRDaI4',
  imageDescription: `Look hes chillen!`,
  name: 'Peter',
  sex: 'Male',
  age: 6,
  breed: 'NorEaster',
  story: 'Thinkful grad',
  animal: 'cat'
},
];

const dogs = [{
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away', 
  animal: 'dog'
},
{
  imageURL: 'https://media.licdn.com/dms/image/C5103AQEv9ADgSV2xOg/profile-displayphoto-shrink_800_800/0?e=1557360000&v=beta&t=nCEDVVxrTlsr2_6qEcGkjgzPEMh2w3m6a6G2j7Gl0SY',
  imageDescription: `He's a smiler!`,
  name: 'John',
  sex: 'Male',
  age: 5,
  breed: 'Marylander',
  story: 'Thinkful grad',
  animal: 'dog'
}
];

app.get(`/api/cat`, (req, res, next) => {
  const [cat] = cats;
  res.send(cat);
}
);

app.get('/api/dog', (req, res, next) => {
  res.send(dogs[0]);
});

app.delete('/api/cat', (req, res, next) => {
  cats.shift();
  res.status(204).send();
});

app.delete('/api/dog', (req, res, next) => {
  dogs.shift();
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

'use strict'

const express = require('express');
const app = express();
const db = require('./dbs');

app.use(express.static('client', { extensions: ['html'] }));

async function postAnswer(req, res) {
  const answers = await db.addAnswer(req.body.asw);
  res.json(answers);
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.post('/answers', express.json(), asyncWrap(postAnswer));

app.listen(8080, (e) =>{
  console.log(`Server ${e? "failed to start" :"is listening"}`);
});

'use strict'

// const uuid = require('uuid-random');
const express = require('express');
const app = express();
const db = require('./dbs');

// app.use(express.static('client'));
app.use(express.static('client', { extensions: ['html'] }));

// let answers = [
//   {id: 'one', asw: 'example '},
//   {id: 'two', asw: 'example2'},
// ];

// let answers = []

async function getAnswers(req, res) {
  res.json(await db.listAnswers());
}
//
// async function getMessage(req, res) {
//   const result = await db.findMessage(req.params.id);
//   if (!result) {
//     res.status(404).send('No match for that ID.');
//     return;
//   }
//   res.json(result);
// }
//
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


app.get('/answers', asyncWrap(getAnswers));
// app.get('/answers/:id', asyncWrap(getAnswer));
app.post('/answers', express.json(), asyncWrap(postAnswer));

// // app.get('/answers', (req, res) => {
// //   res.json(answers);
// // });
//
// app.get('/answers/:id', (req, res) => {
//   for (const answer of answers) {
//     if (answer.id === req.params.id) {
//       res.json(answer);
//       return; // short
//     }
//   }
//   res.status(404).send('No match for that ID.');
// });

// app.post('/answers', express.json(), (req, res) => {
//   const newAnswer = {
//     id: uuid(),
//     asw: req.body.asw,
//   };
//   answers = [newAnswer, ...answers];
//   res.json(answers);
// });

app.listen(8080, (e) =>{
  console.log(`Server ${e? "failed to start" :
  "is listening, Website available at http://127.0.0.1:8080 "}`);
});

'use strict'

const uuid = require('uuid-random');
const express = require('express');
const app = express();

app.use(express.static('client'));

// let answers = [
//   {id: 'one', asw: 'example '},
//   {id: 'two', asw: 'example2'},
// ];

let answers = []


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

app.post('/answers', express.json(), (req, res) => {
  const newAnswer = {
    id: uuid(),
    asw: req.body.asw,
  };
  answers = [newAnswer, ...answers];
  res.json(answers);
});

app.listen(8080, (e) =>{
  console.log(`Server ${e? "failed to start" :
  "is listening, Website available at http://127.0.0.1:8080 "}`);
});

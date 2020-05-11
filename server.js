'use strict'

const express = require('express');
const app = express();

app.use(express.static('client'));

// app.get('ex.json', (req, res) => {
//   res.json(ex.json);
// });

app.listen(8080, (e) =>{
  console.log(`Server ${e? "failed to start" :
  "is listening, Website available at http://127.0.0.1:8080 "}`);
});

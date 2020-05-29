'use strict';
const uuid = require('uuid-random');
const sqlite = require('sqlite');

//This function opens a connection to the database
async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

// Function that shows all the answers from the database
async function listAnswers() {
  const db = await dbConn;
  return db.all('SELECT * FROM Answers');
}

// Function that adds an answers to the database
async function addAnswer(asw) {
  const db = await dbConn;
  const id = uuid();
  await db.run('INSERT INTO Answers VALUES (?, ?)', [id, asw]);
  return listAnswers();
}

// Exporting the functions
module.exports = {
  listAnswers,
  addAnswer
};

'use strict';
const uuid = require('uuid-random');
const sqlite = require('sqlite');

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

async function listAnswers() {
  const db = await dbConn;
  return db.all('SELECT * FROM Answers');
}

async function addAnswer(asw) {
  const db = await dbConn;

  const id = uuid();
  await db.run('INSERT INTO Answers VALUES (?, ?)', [id, asw]);

  return listAnswers();
}

module.exports = {
  listAnswers,
  addAnswer
};

-- Up

CREATE TABLE Answers (
  id   CHAR(36) PRIMARY KEY,
  asw  TEXT     NULL
);

-- Down

DROP TABLE Answers;

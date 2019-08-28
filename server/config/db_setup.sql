CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  usermail VARCHAR NOT NULL,
  hashPass VARCHAR NOT NULL
);

CREATE TABLE submission(
submissionid SERIAL PRIMARY KEY,
report TEXT,
userid INTEGER REFERENCES users(userid),
fileLocation VARCHAR NOT NULL,
asset VARCHAR NOT NULL,
project VARCHAR NOT NULL,
uploaded TIMESTAMP
);

CREATE TABLE usersPermission(
  userid INTEGER REFERENCES users(userid),
  permission VARCHAR
)
CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  username VARCHAR,
  usermail VARCHAR,
  hashPass VARCHAR
);

CREATE TABLE submission(
submissionid SERIAL PRIMARY KEY,
report TEXT,
userid INTEGER REFERENCES users(userid),
fileLocation VARCHAR,
asset VARCHAR,
project VARCHAR,
uploaded TIMESTAMP
);

CREATE TABLE usersPermission(
  userid INTEGER REFERENCES users(userid),
  permission VARCHAR
)
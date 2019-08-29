CREATE TABLE users(
  userid SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  usermail VARCHAR NOT NULL,
  hashPass VARCHAR NOT NULL
);

CREATE TABLE companies(
  companyid SERIAL PRIMARY KEY,
  company VARCHAR NOT NULL,
  companyurl VARCHAR
);

CREATE TABLE submission(
submissionid SERIAL PRIMARY KEY,
report TEXT,
companyid INTEGER REFERENCES companies(companyid),
fileLocation VARCHAR NOT NULL,
asset VARCHAR NOT NULL,
project VARCHAR NOT NULL,
uploaded TIMESTAMP
);

CREATE TABLE usersPermission(
  userid INTEGER REFERENCES users(userid),
  permission VARCHAR
);

CREATE TABLE employees(
  companyid INTEGER REFERENCES companies(companyid),
  userid INTEGER REFERENCES users(userid)
);
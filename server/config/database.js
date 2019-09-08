const { Pool } = require('pg');
const user = require('os').userInfo().username;

module.exports = () => new Pool({
  user,
  host: 'localhost',
  database: 'solopipe_db',
  password: '1234',
  port: 5432,
});

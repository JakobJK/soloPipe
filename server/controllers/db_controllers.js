const bcrypt = require('bcrypt');
const { Pool } = require('pg');

const user = require('os').userInfo().username;

const pool = new Pool({
  user,
  host: 'localhost',
  database: 'solopipe_db',
  password: '1234',
  port: 5432,
});

module.exports = {

  login: (req, res, next) => {
    const { username, password } = req.body;
    pool
      .query('SELECT * FROM users WHERE username = $1', [username])
      .then((response) => {
        const { hashpass } = response.rows[0];
        bcrypt.compare(password, hashpass, (error, resolve) => {
          if (resolve) {
            return next();
          }
          res.status(401);
          res.send({ error: 'wrong password' });
          return res.end();
        });
      })
      .catch(e => setImmediate(() => {
        console.log(e);
      }));
  },


  // createUser: (req, res, next) => {
  //   const { username, password } = req.body;
  //   const hashPassword = '';
  //   const thisPromise = new Promise(
  //     (resolve, reject) => {
  //       bcrypt.genSalt(10, (err, salt) => {
  //         bcrypt.hash(password, salt, (err, hash) => {
  //           if (err) return err;
  //           resolve(hash);
  //         });
  //       });
  //     },
  //   ).then(
  //     (value) => {
  //       pool
  //         .query('SELECT * FROM users WHERE userid = $1', [1])
  //         .then(res => console.log('user:', res.rows[0], value))
  //         .catch(e => setImmediate(() => {
  //           throw e;
  //         }));


  //       return next();
  //     },

  //   );
  // },

};

const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const path = require('path');
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
      .query(`
      SELECT
      users.userid,
      users.username,
      users.usermail,
      users.hashpass,
      userspermission.permission
      FROM users
      FULL OUTER JOIN userspermission
      ON users.userid = userspermission.userid
      WHERE username = $1`, [username])
      .then((response) => {
        if (response.rows.length === 0) {
          res.sendStatus(401);
          return res.end();
        }
        const { hashpass, userid, permission } = response.rows[0];
        bcrypt.compare(password, hashpass, (error, resolve) => {
          if (resolve) {
            res.locals.userid = userid;
            res.locals.permission = permission;
            res.locals.username = username;
            return next();
          }
          res.sendStatus(401);
          return res.end();
        });
      })
      .catch(e => setImmediate(() => {
        console.log(e);
      }));
  },

  getUsers: (req, res) => {
    if (res.locals.permission !== 'isAdmin') {
      res.sendStatus(401);
      return res.end();
    }
    pool
      .query(`
      SELECT
      users.userid,
      users.username,
      users.usermail,
      userspermission.permission
      FROM users
      FULL OUTER JOIN userspermission
      ON users.userid = userspermission.userid`)
      .then((response) => {
        res.send(response.rows);
        return res.end();
      })
      .catch(error => setImmediate(() => error));
  },

  submissions: (req, res, next) => {
    const { userid, permission } = res.locals;

    const adminSql = `
    SELECT
    submission.submissionid,
    submission.report,
    submission.userid,
    submission.filelocation,
    submission.asset,
    submission.project,
    submission.uploaded,
    users.username,
    users.usermail
    FROM submission
    JOIN users
    ON users.userid = submission.userid
    `;

    const userSql = `
    SELECT
    submission.submissionid,
    submission.report,
    submission.userid,
    submission.filelocation,
    submission.asset,
    submission.project,
    submission.uploaded,
    users.username,
    users.usermail
    FROM submission
    JOIN users
    ON users.userid = submission.userid
    WHERE userid = ${userid}
    `;

    const sql = permission ? adminSql : userSql;
    pool
      .query(sql)
      .then((response) => {
        console.log(response.rows);
        res.send(response.rows);
        res.end();
      })
      .catch(error => setImmediate(() => error));
  },
  db_uploadWrite: (req, res, next) => {
    const {
      report, asset, project, userid,
    } = req.headers;

    const client = parseInt(userid, 10);
    const fileLocation = req.file.path;

    pool
      .query(`INSERT INTO submission
      (report, userid, fileLocation, asset, project, uploaded )
      VALUES ($1, $2, $3, $4, $5, now() )`, [report, client, fileLocation, asset, project])
      .then((response) => {
        console.log(response);
        next();
      })
      .catch(error => setImmediate(() => error));

    return next();
  },

  verifyUpload: (req, res, next) => {
    const { username, password } = req.headers;
    pool
      .query(`
      SELECT
      users.userid,
      users.username,
      users.usermail,
      users.hashpass,
      userspermission.permission
      FROM users
      FULL OUTER JOIN userspermission
      ON users.userid = userspermission.userid
      WHERE username = $1`, [username])
      .then((response) => {
        const { hashpass, userid, permission } = response.rows[0];
        bcrypt.compare(password, hashpass, (error, resolve) => {
          if (resolve && permission === 'isAdmin') {
            res.locals.userid = userid;
            res.locals.permission = 'isAdmin';
            return next();
          }
          res.send({ error: 'Wrong password' });
          return res.end();
        });
      })
      .catch(e => setImmediate(() => {
        console.log(e);
      }));
  },
  createUser: (req, res, next) => {
    const { username, password, usermail } = req.body;
    const pm = new Promise(
      (resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) return error;
            resolve(hash);
          });
        });
      },
    ).then(
      (hashpass) => {
        pool
          .query('INSERT INTO users (username, usermail, hashpass) values ($1, $2, $3) RETURNING userid, username, usermail', [username, usermail, hashpass])
          .then((response) => {
            console.log('');
            return next();
          })
          .catch(e => setImmediate(() => {
            throw e;
          }));
      },
    );
  },

  deleteUser: (req, res) => {
    const userid = req.params.id;
    pool
      .query('DELETE FROM users WHERE userid = $1 RETURNING username', [userid])
      .then((response) => {
        res.sendStatus(200);
        res.send({ deleted: response.rows[0] });
        res.end();
      })
      .catch(error => setImmediate(() => error));
  },

  getfile: (req, res) => {
    const submissionid = req.params.id;
    pool
      .query('SELECT * FROM submission WHERE submissionid = $1', [submissionid])
      .then((response) => {
        const {
          userid,
          filelocation,
        } = response.rows[0];

        if (res.locals.userid === userid || res.locals.permission === 'isAdmin') {
          res.sendFile(path.join(__dirname, '../', filelocation), (error) => {
            if (error) console.log(error);
          });
        } else {
          console.log('Not SendFile');
        }
      })
      .catch(error => setImmediate(() => error));
  },
};

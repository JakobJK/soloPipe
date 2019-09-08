const jwt = require('jsonwebtoken');
const jwtSecret = require('../secrets/jwtSecret');

module.exports = {
  verify: (req, res, next) => {
    const { Authentication } = req.cookies;
    if (!Authentication) {
      res.sendStatus(401);
      return res.end();
    }
    jwt.verify(Authentication, jwtSecret, (err, openJWT) => {
      if (err) {
        res.sendStatus(401);
        return res.end();
      }
      if (openJWT.isLoggedIn) {
        res.locals.permission = openJWT.permission;
        res.locals.userid = openJWT.userid;
        return next();
      }
    });
  },

  signToken: (req, res, next) => {
    const signedJWT = jwt.sign(
      {
        userid: res.locals.userid,
        permission: res.locals.permission,
        isLoggedIn: 1,
      },
      jwtSecret,
    );
    res.cookie('Authentication', signedJWT);
    return res.send({
      userid: res.locals.userid,
      username: res.locals.username,
      permission: res.locals.permission,
      isLoggedIn: 1,
    });
  },

  isAdmin: (req, res, next) => {
    if (res.locals.permission === 'isAdmin') return next();
    res.sendStatus(401);
    return res.end();
  },
};

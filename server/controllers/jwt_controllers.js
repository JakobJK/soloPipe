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
        res.locals.companyid = openJWT.companyid;
        return next();
      }
    });
  },

  signToken: (req, res, next) => {
    const signedJWT = jwt.sign(
      {
        userid: res.locals.userid,
        permission: res.locals.permission,
        companyid: res.locals.companyid,
        companyName: res.locals.companyName,
        isLoggedIn: 1,
      },
      jwtSecret,
    );
    res.cookie('Authentication', signedJWT);
    res.send({
      username: res.locals.username,
      userid: res.locals.userid,
      permission: res.locals.permission,
      companyid: res.locals.companyid,
      isLoggedIn: 1,
    });
    return res.end();
  },

  isAdmin: (req, res, next) => {
    if (res.locals.permission === 'isAdmin') return next();
    res.sendStatus(401);
    return res.end();
  },


  signForgetToken: (req, res, next) => {
    const forgotToken = jwt.sign({
      userid: res.locals.userid,
      forgot: true,
    },
    jwtSecret);
    res.locals.forgotToken = forgotToken;
    return next();
  },
};

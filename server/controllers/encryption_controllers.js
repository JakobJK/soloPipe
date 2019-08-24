const bcrypt = require('bcrypt');


module.exports = {
  login: (req, res, next) => {
    const { username, password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return err;
        return next();
      });
    });
  },

  verify: (req, res, next) => {

  },
};

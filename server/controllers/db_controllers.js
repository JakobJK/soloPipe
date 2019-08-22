module.exports = {

  login: (req, res, next) => {
    console.log('in middleware');
    next();
  },
};

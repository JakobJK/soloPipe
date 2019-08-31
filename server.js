const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  login,
  createUser,
  findEmail,
  deleteUser,
  getUsers,
  getfile,
  db_uploadWrite,
  verifyUpload,
  submissions,
  forMayaUI,
} = require('./server/controllers/db_controllers');
const upload = require('./server/controllers/upload_controllers');
const {
  verify,
  signToken,
  signForgetToken,
  signUploadToken,
  isAdmin,
} = require('./server/controllers/jwt_controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static('dist'));


app.post('/api/login',
  login,
  signToken, (req, res) => {
    res.cookie('Authentication', res.locals.signedJWT);
    res.send({
      username: res.locals.username,
      userid: res.locals.userid,
      permission: res.locals.permission,
      companyid: res.locals.companyid,
      isLoggedIn: 1,
    });
    res.end();
  });

app.get('/api/submissions/',
  verify,
  submissions,
  (req, res) => {
    res.sendStatus(200);
    res.end();
  });

app.get('/api/submission/:id',
  verify,
  getfile);

// Admin Permissions Only


app.get('/api/getusers',
  verify,
  isAdmin,
  getUsers);

app.post('/api/createUser',
  verify,
  isAdmin,
  createUser,
  (req, res) => {
    res.end();
  });

app.delete('/api/deleteUser/:id',
  verify,
  isAdmin,
  deleteUser,
  (req, res) => {
    res.end();
  });


app.post('/api/upload',
  verifyUpload,
  isAdmin,
  upload.single('upload_file'),
  db_uploadWrite,
  (req, res) => {
    res.end();
  });

app.post('/api/forgot',
  findEmail,
  signForgetToken,
  (req, res) => {
    console.log('lol');
    return res.end();
  });

app.get('/api/forgot/:token',
  (req, res) => {
    console.log('lol');
    return res.end();
  });

app.post('/api/mayaLogin',
  login,
  isAdmin,
  signUploadToken,
  forMayaUI,
  (req, res) => {
    res.send({
      JWT: res.locals.uploadToken,
      res: res.locals.mayaUI,
    });
  });


app.listen(3000, () => console.log('Server is running on port 3000'));

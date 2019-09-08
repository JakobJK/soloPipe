const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {
  login,
  createUser,
  deleteUser,
  getUsers,
  getfile,
  db_uploadWrite,
  verifyUpload,
  submissions,
} = require('./server/controllers/db_controllers');
const upload = require('./server/controllers/upload_controllers');
const {
  verify,
  signToken,
  isAdmin,
} = require('./server/controllers/jwt_controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static('dist'));


app.post('/api/login',
  login,
  signToken);

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


app.listen(3000, () => console.log('Server is running on port 3000'));

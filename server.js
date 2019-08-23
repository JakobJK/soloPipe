const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./server/controllers/db_controllers');
const upload = require('./server/controllers/upload_controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));


app.post('/api/login',
  login,
  // isRegistered
  // Sign JWTs
  // Set Cookie
  // Return with a response saying you got in!
  (req, res) => {
    res.status(200);
    res.send(req.body);
    res.end();
  });


app.post('/api/createUser',
  // Verify that I am logged in as Admin using JWTs
  // Verify that the input is correct.
  // Store the information in a DB
  // Give a response saying that the use was succesfully created
  (req, res) => {
    res.end();
  });


app.post('/api/upload',
  upload.single('upload_file'),
  // Verify the user is me
  // Mac address???
  // upload the file
  // store it in uploads
  (req, res) => {
    const { file } = req;
    console.log(file);
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
    }
    return res.send({ loginFail: 'Yes' });
  });

app.listen(3000, () => console.log('Server is running on port 3000'));

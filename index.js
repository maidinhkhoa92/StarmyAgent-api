const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const backend = require('./app/back-end/route');
const frontend = require('./app/front-end/route');
const cors = require('cors');
const error = require('./app/helper/error');

require('./app/config/database');
require('dotenv').config()

app
  .use(morgan('tiny'))
  .use(bodyParser.json())
  .use(cors())
  .use('/backend', backend)
  .use('/frontend', frontend)
  .use(error)
  .listen(process.env.PORT || 8081, function (error) {
    if (error) throw error;
    app.get('/', function (req, res) {
      console.log('Your Web app s running.' + process.env.PORT || 8081)
      res.send('Your Web app s running.' + process.env.PORT || 8081);
    })
  });

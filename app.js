const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const init = require('./init');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3001;
const connectionString = 'mongodb://localhost/auth';

// setting the port
app.listen(port, () => {
  console.log('server running on port ', port);

  // connect to mongo database
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    retryWrites: true,
    w: 'majority'
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('DB connection stablished');
    init(app);
  });
});

// use middleware to parse the request body
app.use(bodyParser.json({ limit: '15mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/uploads`));
console.log('Ruta'+`${__dirname}/uploads`);
// allow cross-domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language');
  next();
});

/*
// custom middleware
app.use('/', (req, res, next) => {
  console.log('requested URL: ', req.url);
  next(); // go to next middleware
});
*/

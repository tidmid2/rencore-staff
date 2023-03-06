const express = require('express');
const cors = require("cors");


const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config();
require('./config/db');

var corsOptions = {
  origin: "http://localhost:3001"
};

const isProduction = process.env.NODE_ENV === 'production';

const passport = require('passport');
require('./config/passport');

const morgan = require('morgan')

const app = express();

// app.use(express.static('build'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (isProduction) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const compression = require("compression");
app.use(compression());

const helmet = require("helmet")
app.use(helmet())

var cookieParser = require('cookie-parser');
app.use(cookieParser(process.env.SESSION_SECRET));

const { pool } = require('./config/db');
app.use(session({ 
  store: new pgSession({
    pool
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction, // SSL only in production
    maxAge: 7 * 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');

if(isProduction){
  const path = require('path');
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
  });
}

app.use('/api', routes);
  
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          data: error.message || 'Internal Server Error',
      },
  })
})


app.use(cors(corsOptions));

app.listen(process.env.PORT, () => {
	console.log(`API listening at http://localhost:${process.env.PORT}`);
});
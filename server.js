const express = require('express');

// iPmb+7OXhs7GzSNK6lDr3cFFGZxCB490jclSwHTRajbvLPEsmkFoZWKWlvSwRJGW/nUOetvbpUUXXkdcmcPI5PV2QX4h6PCLBWr+YTg3dClkBQl9JmOY3EC5Bf/N7s9CUgZLUkzRakqao6F6/I3qdRMsf47vESKxE3ERaVJBc3cOmLMhu53R02NUL0X8nk6jKUgrptEDx8VCzzkhClD0YkNZB1aoT5ewQQyaN3/VsAZYcKKNK+QuKQX10+dVBaJ59sArAnjeYqB4nvr28vXd/EFxaFFuCgna5zhiAtb2SXIK1Wh71z/mH47MWAYQSMz2z42EXLGugoiKgc6VYEHA==

// connect-pg-simple stores session info in postgres db
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

require('dotenv').config();
require('./config/db');

const isProduction = process.env.NODE_ENV === 'production';

const passport = require('passport');
require('./config/passport');

const morgan = require('morgan')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (isProduction) {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

const compression = require("compression");
app.use(compression());

// Add header security
const helmet = require("helmet")
app.use(helmet())

// configure express-session to store data in postgres
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
    maxAge: 7 * 24 * 60 * 60 * 1000 // expires in 1 week
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const routes = require('./routes');
app.use('/api', routes);

// Improved error handling
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
      error: {
          status: error.status || 500,
          data: error.message || 'Internal Server Error',
      },
  })
})

// Document API with Swagger if not in production
// Docs available at /api/docs
if (!isProduction) {
  const YAML = require('yamljs')
  const swaggerUI = require('swagger-ui-express')
  const swaggerDocument = YAML.load('./openapi.yaml');
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument,
    // Option to disabe swagger Try it Out button
    { swaggerOptions: { supportedSubmitMethods: [] }
  }));
}

app.listen(process.env.PORT, () => {
	console.log(`API listening at http://localhost:${process.env.PORT}`);
});
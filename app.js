require('dotenv').config();
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');

// Initialize Express
const app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static('public'));
// Site favicon
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGODB;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Handlebars
app.engine(
  `handlebars`,
  exphbs({
    defaultLayout: `main`,
    helpers: {
      section: express_handlebars_sections()
    }
  })
);

app.set(`view engine`, `handlebars`);

// Routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

module.exports = app;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const express_handlebars_sections = require("express-handlebars-sections");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Handlebars
app.engine(
  `handlebars`,
  exphbs({
    defaultLayout: `main`,
    helpers: {
      section: express_handlebars_sections(),
    },
  })
);

app.set(`view engine`, `handlebars`);

// Routes

// Start the server
app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});

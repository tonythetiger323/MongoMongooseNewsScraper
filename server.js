require("dotenv").config();
const path = require('path');
const express = require("express");
const favicon = require('serve-favicon');
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const express_handlebars_sections = require("express-handlebars-sections");



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
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));

// Connect to the Mongo DB
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

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
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Start the server
app.listen(PORT, () => {
  console.log("App running on port " + PORT + "!");
});

const app = require('./app');

// Set the PORT
const PORT = process.env.PORT || 3030;

// Start the server
app.listen(PORT, () => {
  console.log('App running on port ' + PORT + '!');
});

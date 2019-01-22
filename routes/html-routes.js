const router = require('../controller/controller');

module.exports = app => {
  //load index page
  app.get("/", router.index);
  app.get("/index", router.index);
  app.get("/home", router.index);
  app.get("/savedarticles", router.savedarticles);
};
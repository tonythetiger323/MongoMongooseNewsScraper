const router = require('../controllers/controller');

module.exports = app => {
  //load index page
  app.get('/', router.index);
  app.get('/savedarticles', router.savedarticles);
};

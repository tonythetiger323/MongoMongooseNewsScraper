process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');
const Article = require('../models/Article');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('server');
const should = chai.should();

chai.use(chaiHttp);
describe('Articles', () => {
  beforeEach(done => {
    Article.remove({}, err => {
      done();
    });
  });

  describe('/GET article', () => {
    it('it should GET all the articles', done => {
      chai
        .request(server)
        .get('/api/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('JSON');
          done();
        });
    });
  });

  describe('/GET scrape', () => {
    it('it should GET the data back from the scrape and add it to mongo, if there are no issues, should send back {code: success} as a JSON object', done => {
      chai
        .request(server)
        .get('/api/scrape')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('JSON');
          done();
        });
    });
  });

  describe('/PUT updates the saved value from true to false', done => {
    chai.request(server).put('/api/articles/:id/update');
  });
});

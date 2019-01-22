const mongoose = require("mongoose");
const Article = require("../models/Article");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("server");
const should = chai.should();

chai.use(chaiHttp);
describe("Articles", () => {
  beforeEach(done => {
    Article.remove({}, err => {
      done();
    });
  });

  describe('/GET article', () => {
    it('it should GET all the articles', done => {
      chai.request(server)
        .get('/api/articles')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('JSON');
          res.body.length.should.be.eql(1);
          done();
        })
    }
    ])
  })
});

const db = require('../models');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
  app.get('/api/scrape', (req, res) => {
    axios.get('gi').then(response => {

      const $ = cheerio.load(response.data);

      $('article div.listed-article-content').each(function (i, element) {

        const result = {};


        result.title = $(this)
          .children('a')
          .text();
        result.link = $(this)
          .children('a')
          .attr('href');


        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.log(err))

      });

      res.json({ 'code': 'success' })

    });
  });

  app.get('/api/articles', (req, res) => {

    db.Article.find({})
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.put('/api/articles/:id/update', (req, res) => {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { $set: { saved: true } })
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.get('/api/articles/:saved', (req, res) => {
    console.log(req.params.saved);
    if (req.params.saved === 'true') {
      req.params.saved = Boolean(true);
    }
    console.log(req.params.saved);
    db.Article.find({ saved: req.params.saved })
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));

  });


};

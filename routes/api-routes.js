const db = require('../models');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = app => {
  app.get('/api/scrape', (req, res) => {
    axios.get('https://www.superherohype.com/').then(response => {
      const $ = cheerio.load(response.data);

      $('article div.listed-article-content').each(function(i, element) {
        const result = {};

        result.title = $(this)
          .children('a')
          .text();
        result.summary = $(this)
          .children('div.listed-article-excerpt')
          .text();
        result.link = $(this)
          .children('a')
          .attr('href');

        db.Article.create(result)
          .then(dbArticle => console.log(dbArticle))
          .catch(err => console.log(err));
      });

      res.json({ code: 'success' });
    });
  });

  app.get('/api/articles', (req, res) => {
    db.Article.find({})
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.put('/api/articles/:id/saveArticle', (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: true } }
    )
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.put('/api/articles/:id/deleteSavedArticle', (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { saved: false } }
    )
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.get('/api/articles/findSaved/:saved', (req, res) => {
    if (req.params.saved === 'true') {
      req.params.saved = Boolean(true);
    }

    db.Article.find({ saved: req.params.saved })
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.get('/api/articles/findArticleById/:id', (req, res) => {
    db.Article.findById(req.params.id)
      .populate('note')

      .then(dbArticles => res.json(dbArticles))
      .catch(err => res.json(err));
  });

  app.get('/api/notes', (req, res) => {
    db.Notes.find({})
      .then(dbNotes => res.json(dbNotes))
      .catch(err => res.json(err));
  });

  app.post('/api/notes/:id', (req, res) => {
    db.Note.create(req.body)

      .then(dbNote => {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { notes: dbNote._id } },
          { new: true }
        );
      })

      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  });
};

/* eslint-disable indent */
/* eslint-disable no-unused-vars */
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

        db.Article.create(result);
      });

      res.json({ code: 'success' });
    });
  });

  app.get('/api/articles', (req, res) => {
    db.Article.find({})
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.put('/api/articles/:_id/saveArticle', (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { saved: true } }
    )
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err));
  });

  app.put('/api/articles/:_id/deleteSavedArticle', (req, res) => {
    db.Article.findOneAndUpdate(
      { _id: req.params._id },
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

  app.get('/api/articles/findArticleById/:_id', (req, res) => {
    db.Article.findById(req.params._id)
      .populate('notes')

      .then(dbArticles => {
        res.json(dbArticles);
      })
      .catch(err => res.json(err));
  });

  app.get('/api/notes', (req, res) => {
    db.Notes.find({})
      .populate('article')
      .then(dbNotes => res.json(dbNotes))
      .catch(err => res.json(err));
  });

  app.post('/api/notes/:_id', (req, res) => {
    db.Note.create(req.body)

      .then(dbNote => {
        return db.Article.findOneAndUpdate(
          { _id: req.params._id },
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

  app.delete('/api/notes/:_id/deleteNote', (req, res) => {
    console.log(req.params._id);
    db.Note.findByIdAndDelete(req.params._id)
      .then(dbNote => {
        return db.Article.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { notes: dbNote._id } },
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

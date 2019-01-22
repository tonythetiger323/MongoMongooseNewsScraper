const express = require("express");
const router = express.Router();

//when a route points to load index page
router.index = (req, res) => {
  res.render("index");
};

router.savedarticles = (req, res) => {
  res.render("savedarticles");
};

module.exports = router;
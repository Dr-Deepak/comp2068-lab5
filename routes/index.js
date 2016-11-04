var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lesson6',
                      message: 'Its time to crud with mongodb -Part2' });
});

module.exports = router;

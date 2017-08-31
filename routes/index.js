var knex = require('../db/knex')
var express = require('express');
var router = express.Router();

function Scores() {
  return knex('scores');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  Scores().select().then(
    function(data) {
      let winner = []
      for (var i = 0; i < data.length; i ++) {
        if (data[i].alan_score > data[i].mike_score) {
          winner.push('Alan');
        } else {
          winner.push('Mike');
        }
      }
      console.log(winner);
      let aWinPer = 0
      for (var i = 0; i < data.length; i ++) {
        if (data[i].alan_score > data[i].mike_score) {
          aWinPer += 1
        }
      }
      aWinPer = aWinPer / data.length;
      let mWinPer = 1 - aWinPer;
      res.render('index', { data: data, aWinPer : aWinPer, mWinPer: mWinPer, winner: winner });
    }
  )
});

router.post('/scores/add', function(req, res, next) {
  Scores().insert(req.body).then(
    function(data) {
      console.log('Here ' + data);
      res.redirect('/');
    }
  )
});


module.exports = router;

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
      let totalAlan = 0;
      for (var i = 0; i < data.length; i ++) {
        totalAlan = totalAlan + data[i].alan_score;
      };
      let totalMike = 0;
      for (var i = 0; i < data.length; i ++) {
        totalMike = totalMike + data[i].mike_score;
      };
      let winner = []
      for (var i = 0; i < data.length; i ++) {
        if (data[i].alan_score > data[i].mike_score) {
          winner.push('Alan');
        } else {
          winner.push('Mike');
        }
      }
      let blackWins = 0
      for (var i = 0; i < data.length; i ++) {
        if (data[i].winner_side == true) {
          blackWins ++;
        }
      }
      blackWins = Math.round((blackWins / data.length) * 100);
      let winner_count = 0
      for (var i = 0; i < winner.length; i ++) {
        if (winner[i] === 'Alan') {
          winner_count ++;
        }
      }
      let mikeWins = data.length - winner_count
      let aWinPer = 0
      for (var i = 0; i < data.length; i ++) {
        if (data[i].alan_score > data[i].mike_score) {
          aWinPer += 1
        }
      }
      aWinPer = aWinPer / data.length;
      let mWinPer = 1 - aWinPer;
      aWinPer = Math.round(aWinPer * 100);
      mWinPer = Math.round(mWinPer * 100);
      res.render('index', { data: data, aWinPer : aWinPer, mWinPer: mWinPer, winner: winner, winner_count: winner_count, mikeWins: mikeWins, blackWins: blackWins, totalAlan: totalAlan, totalMike: totalMike });
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

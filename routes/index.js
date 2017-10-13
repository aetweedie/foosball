var knex = require('../db/knex')
var express = require('express');
var router = express.Router();
var Promise = require("bluebird");

function Scores() {
  return knex('scores');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  let mAvg,
      mTotal,
      mWins,
      mWinPer,
      aAvg,
      aTotal,
      aWins,
      aWinPer,
      totalGames,
      lastGames;

  let p1 = knex.schema.raw('select round(cast(avg(mike_score) as numeric), 2) from scores where mike_score < 10;').then( function (data){
    return data.rows[0].round;
  });
  let p2 = knex.schema.raw('select round(cast(avg(alan_score) as numeric), 2) from scores where alan_score < 10;').then( function (data){
    return data.rows[0].round;
  });
  let p3 = Scores().count('mike_score').where({ mike_score: 10 }).then((wins) => {
    return wins[0].count;
  });
  let p4 = Scores().count('alan_score').where({ alan_score: 10 }).then((wins) => {
    return wins[0].count;
  });
  let p5 = Scores().sum('mike_score').then((total) => {
    return total[0].sum;
  });
  let p6 = Scores().sum('alan_score').then((total) => {
    return total[0].sum;
  });
  let p7 = Scores().count().then((totalRows) => {
    return totalRows[0].count;
  });
  let p8 = Scores().orderBy('id', 'desc').limit(10).then((last10Games) => {
    return last10Games;
  });
  let p9 = Scores().select().then((allGames) => {
    return allGames;
  });


  Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9]).then((values) => {
    if (values[2] && values[8]) {
      mWinPer = ((values[2] / values[8].length) * 100).toFixed(1);
    }
    if (values[3] && values[8]) {
      aWinPer = ((values[3] / values[8].length) * 100).toFixed(1);
    }
    res.render('index', {
          mAvg: values[0],
          mTotal: values[4],
          mWins: values[2],
          mWinPer: mWinPer,
          aAvg: values[1],
          aTotal: values[5],
          aWins: values[3],
          aWinPer: aWinPer,
          totalGames: values[8],
          lastGames: values[7],
        });
  });
});

router.get('/scores/add', function(req, res, next) {
  res.render('new_score');
});

router.post('/scores/add', function(req, res, next) {
  if (!req.body.winner_side) {
    req.body.winner_side = true;
  }
  Scores().insert(req.body).then(
    function(data) {
      res.redirect('/');
    }
  )
});

router.get('/scores/all', function(req, res, next) {
  Scores().select().then((data) => {
    res.render('all_scores', { scores: data });
  });
});


module.exports = router;

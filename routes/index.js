var knex = require('../db/knex')
var express = require('express');
var router = express.Router();

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
  knex.schema.raw('select round(cast(avg(mike_score) as numeric), 2) from scores where mike_score < 10;').then( function (data){
    mAvg = data.rows[0].round;
  });
  knex.schema.raw('select round(cast(avg(alan_score) as numeric), 2) from scores where alan_score < 10;').then( function (data){
    aAvg = data.rows[0].round;
  });
  Scores().count('mike_score').where({
    mike_score: 10
  }).then((wins) => {
    mWins = wins[0].count;
  });
  Scores().count('alan_score').where({
    alan_score: 10
  }).then((wins) => {
    aWins = wins[0].count;
  });
  Scores().sum('mike_score').then((total) => {
    mTotal = total[0].sum;
  });
  Scores().sum('alan_score').then((total) => {
    aTotal = total[0].sum;
  });
  Scores().count().then((totalRows) => {
    totalGames = totalRows[0].count;
    if (aWins && totalGames) {
      aWinPer = ((aWins / totalGames) * 100).toFixed(1);
    }
    if (mWins && totalGames) {
      mWinPer = ((mWins / totalGames) * 100).toFixed(1);
    }
  });
  Scores().orderBy('id', 'desc').limit(10).then((last10Games) => {
    lastGames = last10Games;
  })

  if (mAvg && mTotal && mWins && mWinPer && aAvg && aTotal && aWins && aWinPer && totalGames && lastGames) {
    res.render('index', {
      mAvg: mAvg,
      mTotal: mTotal,
      mWins: mWins,
      mWinPer: mWinPer,
      aAvg: aAvg,
      aTotal: aTotal,
      aWins: aWins,
      aWinPer: aWinPer,
      totalGames: totalGames,
      lastGames: lastGames,
    });
  } else {
    setTimeout(() => {
      res.render('index', {
        mAvg: mAvg,
        mTotal: mTotal,
        mWins: mWins,
        mWinPer: mWinPer,
        aAvg: aAvg,
        aTotal: aTotal,
        aWins: aWins,
        aWinPer: aWinPer,
        totalGames: totalGames,
        lastGames: lastGames,
      });
    }, 2000);
  }
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


module.exports = router;

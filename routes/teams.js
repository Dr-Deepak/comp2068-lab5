var express = require('express');
var router = express.Router();
// link to the team model
var Team = require('../models/team');


/* GET teams home page.- show list of teams */
router.get('/',isLoggedIn, function(req, res, next) {
//load team.ejs view
      Team.find(
        function(err, teams){
          if (err) {
            console.log(err);
            rs.redirect('error');
          }else{
            res.render('teams', {
                                  title: 'Playoff Teams',
                                  teams: teams
                                }
                      );
          }
        }
     );
  }
);

/*Get  /teams/add to show the empty form */
router.get('/add',isLoggedIn, function(req, res, next) {
  //load blank form
    res.render('add-team', {
      title: 'Add new team'
    });
});

/*Post /teams/add to process the form submission*/
router.post('/add',isLoggedIn, function(req, res, next){

  Team.create(
    {
      city:req.body.city,
      nickname:req.body.nickname,
      wins: req.body.wins,
      losses:req.body.losses
    },function(err, Team){
        if(err){
          console.log(err);
          res.redirect('/error');
        }else{
          res.redirect('/teams');
        }
      });
    });

  /*Get for DELETE  /teams/delete to parse teamid in url as :id */
  router.get('/delete/:id',isLoggedIn, function(req, res, next) {
        //store value form url
      var id =req.params.id;
      //run delete command
      Team.remove(
        { _id: id },function(err){
            if(err){
              console.log(err);
              res.remder('/error');
            }else{
              res.redirect('/teams');
            }
      });
    });

/*GET  EDIT team page with id parameter */
router.get('/:id',isLoggedIn, function(req, res, next) {
  //look up for selected team
  var id  = req.params.id;

  Team.findById(id, function(err, team){
      if(err){
        console.log(err);
        res.render('error');
      }else{
        res.render('edit-team',{
          title: 'Team Details',
          team:team
        });
      }
  });
});
/*Post /teams/add to process the form submission*/
router.post('/:id',isLoggedIn, function(req, res, next){
    var id = req.params.id;
    //creates a new team pbject and populate it from the form values
    var team = new Team({
      _id: id,
      city: req.body.nickname,
      wins: req.body.wins,
      losses: req.body.losses
    });

    //try update
    Team.update({_id:id }, team, function(err) {
      if(err){
        console.log(err);
        res.render('/error');
      }else{
        res.redirect('/teams');
      }
});
//checks if user is loggedin

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/login');
  }
}
//make public
module.exports = router;

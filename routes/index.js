var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Lab 5',
                      message: 'Practice with passport',
                         user: req.user
  });
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
                           title: 'Register',
                            user: req.user
  });
});

// new Register request
router.post('/register',function(req, res, next) {
  //create a new acccount
  Account.register( new Account({username: req.body.username }) ,req.body.password, function(err,account){
        if(err){
          console.log(err);
          res.redirect('/error')
        }
        else{
          res.redirect('/login',{user:req.user});
        }
      });
    });

/* GET login page. */
router.get('/login', function(req, res, next) {
  if(req.user){
    res.redirect('/teams',{
                            title: 'Teams',
                            user:req.user
    });
  }
  else{
    res.render('login', {
                          title: 'Login',
                 faliureMessage: '',
                           user: req.user
                        }
              );
  }
});

/* Post login page. */
router.post('/login', passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login',
      faliureMessage : 'Invalid Login'
    }
));

//logout request
 router.get('/logoff',function(req, res, next) {
   req.logout();
   res.redirect('/login');
 });


  //res.render('login', { title: 'login'});

module.exports = router;

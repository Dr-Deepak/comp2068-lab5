var express = require('express');
var router = express.Router();
/* GET users listing. */
var Acct = require('../models/account');



// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/',isLoggedIn, function(req, res, next) {
//load team.ejs view
      Acct.find(
        function(err, accounts){

          if (err) {
            console.log(err);
            res.redirect('error');
          }
          else
          {
            res.render('users', {
                                  title: 'Users',
                                  users: accounts,
                                  user:req.user
                                }
                      );
          }
        }
     );
  }
);
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect('/login');
  }
}
module.exports = router;

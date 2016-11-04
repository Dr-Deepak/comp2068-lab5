var mongoose = require('mongoose');
//create a team schema to define this class
var teamSchema = new mongoose.Schema(
                                        {
                                        city: {type :String, required: 'City cannot be blank' },

                                        nickname : {type : String, required:'Nickname cannot be blank'},

                                        wins:{type: Number, min:0},

                                        losses: {type : Number,min:0}
                                      }
                                    );
//make this schema public
//note the publuc class name is singular and starts with capital
module.exports = mongoose.model('Team', teamSchema);

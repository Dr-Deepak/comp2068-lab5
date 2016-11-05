//link to mongoose
var mongoose = require('mongoose');
//
var plm = require('passport-local-mongoose');
//create a team schema to define this class
var AccountSchema = new mongoose.Schema(
                                        {
                                          username: {type : String, required: 'Username is required' },
                                          password: {type : String}
                                        }
                                    );
//connect  this model to passprt local mongoose.
AccountSchema.plugin(plm);
module .exports =  mongoose.model('Account', AccountSchema);

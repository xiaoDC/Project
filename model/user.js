var mongoose = require('mongoose');
var userSchema = require('../schema/user');
var userModel = mongoose.model('user',userSchema); //users是数据库集合的名称

userModel.find(function(err,user){
    if(user.length) return;

    new userModel({
        username:"blue",
        password:"123",
    }).save();

    new userModel({
        username:"taylor",
        password:"123",

    }).save();

})

module.exports = userModel;
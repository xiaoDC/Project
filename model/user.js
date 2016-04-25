var mongoose = require('mongoose');
var userSchema = require('../schema/schema');
var userModel = mongoose.model('user',userSchema); //users是数据库集合的名称

userModel.find(function(err,user){
    if(user.length) return;

    new userModel({
        authId:"001",
        username:"blue",
        password:"123",
        role:"custom",
        email:"001@zj.com"
    }).save();

    new userModel({
        authId:"002",
        username:"taylor",
        password:"123",
        role:"custom",
        email:"001@zj.com"
    }).save();

})

module.exports = userModel;
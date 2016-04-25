var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR =10;
var userSchema = mongoose.Schema ({
    authId:String,
    username:{
        unique:true,
        type:String
    },
    password:String,
    role:String,
    email:String

});

userSchema.pre('save', function(next) {
    var user = this

    bcrypt.hash(user.password, null, null, function (err, hash){
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})






module.exports = userSchema;
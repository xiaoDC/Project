var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR =10;
var userSchema = mongoose.Schema ({
    username:{
        unique:true,
        type:String
    },
    password:String,
    role:{
        type:String,
        default:'user'
    },
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

userSchema.methods = {
    comparePassword: function (_password, cb) {
        bcrypt.compare(_password, this.password, function (err, isMatch) {
            if (err) {
                cb(err)
            }
            cb(null, isMatch)
        })
    }
}

//��̬������fetch�������е��û���findByIdͨ��id�����û�,ͨ��ģ�;Ϳ��Ե���
userSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this.findOne({
            _id: id
        }).exec(cb)
    },
    findByName: function (_name, cb) {
        return this.findOne({
            username: _name
        }).exec(cb)
    }
}




module.exports = userSchema;
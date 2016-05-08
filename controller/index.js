var postModel = require('../model/post')
var userModel = require('../model/user')


exports.index= function(req, res) {
    userModel.find(function(err,user){
        if(err){
            console.log(err)
        }
        if(user){
            postModel
                .find()
                .sort({"meta.updateAt":-1})
                .populate('user','username')
                .exec(function(err,post){
                    res.render('index',{
                        post:post
                    })
                })
        }
    })



}

exports.error=function(req,res){
    res.render('error');
}

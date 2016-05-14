var postModel = require('../model/post')
var userModel = require('../model/user')


exports.index= function(req, res) {
     req.session.lastPage = req.originalUrl
    userModel.find(function(err,user){
        if(err){
            console.log(err)
        }
        postModel
            .find()
            .sort({"meta.updateAt":-1})
            .populate('user')
            .exec(function(err,post){
                res.render('index',{
                    title:'首页',
                    post:post,
                    head:user
                })
            })
    })


}

exports.error=function(req,res){
    res.render('error');
}


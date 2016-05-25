var postModel = require('../model/post')
var userModel = require('../model/user')


exports.index= function(req, res) {
     req.session.lastPage = req.originalUrl
        postModel
            .find()
            .populate('user')
            .sort({"meta.updateAt":-1})
            .exec(function(err,post){
                userModel.find(function(err,user) {
                    if (err) {
                        console.log(err)
                    }
                    res.render('index', {
                        title: '首页',
                        post: post,
                        head: user
                    })

                })
            })




}

exports.error=function(req,res){
    res.render('error');
}


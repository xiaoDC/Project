var postModel = require('../model/post')
var userModel = require('../model/user')

exports.showPost=function(req,res){
    res.render('post')
}

exports.posts=function(req,res){
    var _user = req.session.user
    var _post = req.body.post
    var post = new postModel(_post)
    post.save(function (err,post) {
        if (err) {
            console.log(err)
        }
        res.redirect('/article/'+_user._id+post._id)
        /*res.redirect('/userMain/'+_user._id)*/
    })

}

exports.article=function(req,res){
    var _id = req.params.id
    var _postId = req.params.postId
    userModel.findById(_id,function(err,user){
        if(user){
            postModel
                .findOne({_id:_postId})
                .populate('user','username')
                .exec(function(err,post){
                    if(err){
                        console.log(err)
                    }

                    res.render('article',{
                        post:post
                    })
                })
        }
    })

}

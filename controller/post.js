var postModel = require('../model/post')
var userModel = require('../model/user')
var Comment = require('../model/comment')
exports.showPost=function(req,res){
    res.render('post',{
        title:"编辑页"
    })
}

exports.posts=function(req,res){
    var _user = req.session.user
    var _post = req.body.post
    var post = new postModel(_post)
    post.save(function (err,post) {
        if (err) {
            console.log(err)
        }
        res.redirect('/article/'+_user._id+'/'+post._id)
        /*res.redirect('/userMain/'+_user._id)*/
    })

}

exports.article=function(req,res){
    var _id = req.params.id
    var _postId = req.params.postId
    userModel.findById(_id,function(err,user){
        if(user){
            postModel.find({user:_id}).populate('user','username').exec(function(err,info){

                postModel
                    .findOne({_id:_postId})
                    .populate('user','username')
                    .exec(function(err,post){
                        if(err){
                            console.log(err)
                        }

                        Comment.find({post: _postId})
                            .populate('from', 'username')
                            .populate('reply.from reply.to', 'username')
                            .exec(function(err,comments){
                                res.render('article',{
                                    title:"文章页",
                                    info:info,
                                    comments:comments,
                                    post:post
                                })
                            })


                    })
            })

        }
    })

}

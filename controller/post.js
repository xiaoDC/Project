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


exports.edit=function(req,res){
   var _postId =req.params.postId

      postModel.findOne({_id:_postId},function(err,post){
        if(err){
            console.log(err)
        }

        res.render('edit',{
            title:"修改编辑页",
            post:post
        })
    })
}

exports.update=function(req,res){
    var _user = req.session.user
    var _post = req.body.post
    console.log(_user)
   console.log(_post)
    postModel.update({_id:_post.id},{$set:{title:_post.title,content:_post.content}},function(err){
        if(err){
            console.log(err)
        }

        res.redirect('/article/'+_user._id+'/'+_post.id)
    })
}


exports.delete=function(req,res){
    var _user = req.session.user
    var _postId =req.params.postId

    postModel.remove({_id:_postId},function(err){
        if(err){
            console.log(err)
        }
        Comment.remove({post:_postId})
            .populate('post')
            .exec(function(err){
            if(err){
                console.log(err)
            }

            res.redirect('/userMain/'+_user._id)
        })


    })

}




exports.article=function(req,res){
    req.session.lastPage = req.originalUrl
    var _id = req.params.id
    var _postId = req.params.postId
    userModel.findById(_id,function(err,user){
        if(user){
            postModel.update({_id: _postId}, {$inc: {pv: 1}}, function (err) {
                if(err) {
                    console.log(err)
                }
            })
            postModel.find({user:_id}).populate('user').exec(function(err,info){

                postModel
                    .findOne({_id:_postId})
                    .populate('user')
                    .exec(function(err,post){
                        if(err){
                            console.log(err)
                        }

                        Comment.find({post: _postId})
                            .populate('from', 'username')
                            .populate('reply.from reply.to', 'username')
                            .sort({"meta.updateAt":-1})
                            .exec(function(err,comments){
                                var replyc=0;
                            comments.forEach(function(c){
                                replyc+= c.reply.length;
                                var allc=comments.length+replyc
                               /* console.log(allc)
                                console.log(post.commentL)*/
                                if(post.commentL!=allc){
                                    /*console.log("不等")*/
                                    postModel.update({_id: _postId}, {$set:{ commentL:allc}}, function (err){
                                        if(err) {
                                        console.log(err)
                                        }
                                     })

                                }

                            })
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





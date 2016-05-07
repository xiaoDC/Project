var postModel = require('../model/post')
var userModel = require('../model/user')

exports.showPost=function(req,res){
    res.render('post')
}

exports.posts=function(req,res){
    var _user = req.session.user
    var _post = req.body.post
    console.log(_post)
    var post = new postModel(_post)
    post.save(function (err,post) {
        if (err) {
            console.log(err)
        }
       /* res.redirect('/article/'+_user._id+"/"+post.title+"/"+post.meta.createAt)*/
        res.redirect('/userMain/'+_user._id)
    })
}

exports.article=function(res,req){
    var _id = req.params.id
    var _title = req.params.title
    var _time = req.params.time
    res.render("article",{
        id:_id,
        title:_title,
        time:_time
    })
}

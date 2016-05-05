var postModel = require('../model/post')

exports.showPost=function(req,res){
    res.render('post')
}

exports.posts=function(req,res){
    var _user = req.session.user
    var _post = req.body.post
    console.log("123")
    console.log(_post)
    var post = new postModel(_post)
    post.save(function (err,post) {
        if (err) {
            console.log(err)
        }
        res.redirect('/userMain/'+_user._id)
    })
}
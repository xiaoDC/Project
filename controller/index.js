var postModel = require('../model/post')

exports.index= function(req, res) {
    postModel.find(function(err,post){
        console.log(post)
        if(err){
            console.log(err)
        }
        res.render('index',{
            post:post
        });
    })


}

exports.error=function(req,res){
    res.render('error');
}

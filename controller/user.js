var userModel = require('../model/user')
var postModel = require('../model/post')
var fs = require('fs')
var path = require('path')


//signup
exports.signup=function(req,res){
    var _user = req.body.user
    userModel.find({username:_user.username},function(err, user){

        if (err) {
            console.log(err)
        }
        if (user.length) {
            console.log('用户已存在')
            res.redirect('/')
        }else {
            var user = new userModel(_user)
            user.save(function (err,user){
                if (err) {
                    console.log(err)
                }
                res.redirect('/userList')
            })
        }
    })

}
exports.showSignup=function(req,res){
    res.render('signup',{
        title:"注册页"
    });
}

//login
exports.showLogin=function(req,res){
    res.render('login',{
        title:"登陆页"
    });
}

exports.login=function(req,res){
    var _user = req.body.user
    var username = _user.username
    var password = _user.password
    /*  console.log(_user)
     console.log(username)*/
    userModel.findOne({"username":username}, function (err, user){

        if (err) {
            console.log(err)
        }

        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.user = user

                    console.log('密码正确')
                    if(req.session.user.role=="admin")
                        res.redirect('/userList')
                    else{
                        res.redirect('/userMain/'+user._id)
                    }
                } else {
                    console.log('密码错误')

                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })

}

//logout
exports.logout=function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
}

//userList
exports.userList=function(req,res){
    var _user=req.session.user
    userModel.find(function(err,users){
        if(err){
            console.log(err)
        }
        if(_user && _user.role=='admin'){

            res.render('userList',{
                title:"信息页",
                users:users,
            });
        }else{
            req.session.error = "请先登录";
            res.redirect('login');
        }
    })
}

//userMain
exports.userMain=function(req,res){
    var _id = req.params.id
    userModel.findById(_id,function(err,user){

        if(err){
            console.log(err)
        }
        if(!user){
            req.flash('error',err)
            res.redirect('/signup')
        }
        else{
            postModel
                .find({user:_id})
                .sort({"meta.updateAt":-1})
                .populate('user','username')
                .exec(function(err,post){
                    var name = user.username
                    var photo = user.photo
                    res.render('userMain',{
                        title:"用户页",
                        name:name,
                        post:post,
                        photo:photo
                    })


                })

        }
    })
}


exports.savePhoto=function(req, res, next){
    console.log("hello")
    var _user = req.session.user
    var photoData = req.files.uploadPhoto
    var filePath = photoData.path
    var originalFilename = photoData.originalFilename


    console.log(photoData)
    console.log(filePath)
    console.log(originalFilename)

    if (originalFilename) {
        fs.readFile(filePath, function (err, data) {
            var timestamp = Date.now()
            var type = photoData.type.split('/')[1]
            var photo = timestamp + '.' + type
            var newPath = path.join(__dirname, '../', 'public/images/' + photo)

            console.log(photo)
            fs.writeFile(newPath, data, function (err) {
                if(err){
                    console.log(err)
                }
                /*req.photo = photo*/
                userModel.update({_id:_user._id},{$set:{photo:photo}},function(err){
                    if(err){
                        console.log(err)
                    }

                    res.redirect('/userMain/'+_user._id)
                })
            })

        })

    } else {
        next()
    }
}

exports.updateP = function(req,res){
    console.log('hah')
    console.log(req.photo)
    var _user = req.session.user
    if(req.photo){
        userModel.update({_id:_user._id},{$set:{photo:photo}},function(err){
            if(err){
                console.log(err)
            }
            res.redirect('/userMain/'+_user._id)
        })
    }
    else{
        res.redirect('/')
    }
}

exports.loginRequired = function (req, res, next) {
    var user = req.session.user
    if (!user) {
        return res.redirect('/login')
    }
    next()
}

exports.adminRequired = function (req, res, next) {
    var user = req.session.user
    if (user.role !=="admin" || !user.role) {
        return res.redirect('/login')
    }
    next()
}
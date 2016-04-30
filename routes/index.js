var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userModel = require('../model/user')
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});





router.get('/', function(req, res, next) {

  res.render('index');
});

router.get('/error',function(req,res){
  res.render('error');
});
//signup
router.post('/signup',function(req,res){
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
                res.redirect('/home')
            })
        }
    })

})
router.get('/signup',function(req,res){
     res.render('signup');
})

//login
router.get('/login',function(req,res){
     res.render('login');
});

router.post('/login',function(req,res){

     /*   var user = {
            username:'admin',
            password:'admin',
        }
        console.log(req.body.username);
        if(req.body.username==user.username&&req.body.password==user.password)
        {
            req.session.user = user;
            res.send(200);


        }else{
            req.session.error = "用户名或密码错误"
            res.send(404);
        }
*/
    var _user = req.body.user
    var username = _user.username
    var password = _user.password
    console.log(_user)
    console.log(username)
    userModel.findOne({"username":username}, function (err, user){
        console.log(user)
        if (err) {
            console.log(err)
        }
        if(!user){
            res.redirect('/')
        }
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.user = user
                    console.log('密码正确')

                    res.redirect(302,'/home')
                } else {
                    console.log('密码错误')

                      res.redirect('/login')
                }
            })
        } else {
             res.redirect('/login')
        }
    })

    });


router.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect(302,'/');
});

router.get('/home',function(req,res){
    userModel.find(function(err,users){
        if(err){
            console.log(err)
        }
        if(req.session.user){
             res.render('home',{
                users:users,
            });
        }else{
            req.session.error = "请先登录";
             res.redirect(302,'login');
        }


    })

});

router.get('/book1',function(req,res){

    res.render('book1')

})


module.exports = router;

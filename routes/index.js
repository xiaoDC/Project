var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
  res.render('index', { title: '首页' });
});

router.get('/error',function(req,res){
  res.render('error');
});

router.get('/login',function(req,res){
    res.render('login',{title:'登陆页'});
});

router.post('/login',function(req,res){
        var user={
            'username':'admin',
            'password':'admin'
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
    });
router.get('/wrong',function(req,res){
    res.render('wrong');
});

router.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('/');
});

router.get('/home',function(req,res){
    if(req.session.user){
        res.render('home',{title:'主页面'});
    }else{
        req.session.error = "请先登录";
        res.redirect('wrong');
    }
});

module.exports = router;

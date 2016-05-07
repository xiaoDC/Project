var express = require('express');
var router = express.Router();


var Index = require('../controller/index')
var User = require('../controller/user')
var Post = require('../controller/post')




router.get('/', Index.index)
router.get('/error',Index.error)
//signup
router.post('/signup',User.signup)
router.get('/signup',User.showSignup)
//login
router.get('/login',User.showLogin)
router.post('/login',User.login)
//logout
router.get('/logout',User.loginRequired, User.logout)
//用户主页
router.get('/userMain/:id',User.userMain)
//userList
router.get('/userList',User.loginRequired, User.adminRequired,User.userList)

//post
router.get('/post',User.loginRequired,Post.showPost)
router.post('/post',User.loginRequired,Post.posts)
router.get('/article/:id/:title/:time',Post.article)



module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");

var Index = require('../controller/index')
var User = require('../controller/user')
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});



router.get('/', Index.index)
router.get('/error',Index.error)
//signup
router.post('/signup',User.signup)
router.get('/signup',User.showSignup)
//login
router.get('/login',User.showLogin)
router.post('/login',User.login)
//logout
router.get('/logout', User.logout)
//userList
router.get('/userList',User.userList)





module.exports = router;

var userModel = require('../model/user')
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
    res.render('signup');
}

//login
exports.showLogin=function(req,res){
    res.render('login');
}

exports.login=function(req,res){

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
                    if(req.session.user.role=="admin")
                        res.redirect('/userList')
                    else{
                        res.redirect('/')
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
    res.redirect(302,'/');
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
                users:users,
            });
        }else{
            req.session.error = "请先登录";
            res.redirect('login');
        }


    })

}
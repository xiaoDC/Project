var mongoose = require('mongoose');
var MySchema = require('../schema/schema');
var MyModel = mongoose.model('test1',MySchema); //test1是数据库集合的名称
var db = mongoose.connect("mongodb://127.0.0.1:27017/test");
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});
var userinfo = new MyModel({
    username:"swift",
    password:"111"
});
userinfo.save(function(error,doc){
    if(error){
        console.log("error :" + error);
    }else{
        console.log(doc);
    }
});
module.exports = MyModel;
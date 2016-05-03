var mongoose = require('mongoose');
var postSchema = require('../schema/post');
var postModel = mongoose.model('post',postSchema);



module.exports = postModel;
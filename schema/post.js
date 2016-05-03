var mongoose = require('mongoose');
var postSchema = mongoose.Schema ({
  title:String,
  content:String

});

//静态方法：fetch查找所有的用户，findById通过id查找用户,通过模型就可以调用
postSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this.findOne({
            _id: id
        }).exec(cb)
    },
    findByName: function (_name, cb) {
        return this.findOne({
            username: _name
        }).exec(cb)
    }
}

module.exports = postSchema;
var mongoose = require('mongoose');
var postSchema = mongoose.Schema ({
  title:String,
  content:String

});

//��̬������fetch�������е��û���findByIdͨ��id�����û�,ͨ��ģ�;Ϳ��Ե���
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
var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var postSchema = new Schema({
  user:{
      type: ObjectId,
      ref: 'userModel'
  },
  title:String,
  content:String,
  meta:{
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }

});


postSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})
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
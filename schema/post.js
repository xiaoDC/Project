var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var date = new Date()
var postSchema = new Schema({
    user:{
        type: ObjectId,
        ref: 'user'
    },
    title:String,
    content:String,
    meta:{
        createAt: {
            type: String,
            default: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()+1)+'  '+date.getHours()+':'+date.getMinutes()
        },
        updateAt: {
            type: String,
            default:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()+1)+'  '+date.getHours()+':'+date.getMinutes()
        }
    }

});


postSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()+1)+' '+date.getHours()+':'+date.getMinutes()
    } else {
        this.meta.updateAt = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDay()+1)+' '+date.getHours()+':'+date.getMinutes()
    }
    next()
})
//静态方法：fetch查找所有的用户，findById通过id查找用户,通过模型就可以调用
postSchema.statics = {

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
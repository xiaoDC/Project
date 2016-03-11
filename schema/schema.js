var mongoose = require('mongoose');
var MySchema = mongoose.Schema ({
    username:{type:String},
    password:{type:String}
});

module.exports = MySchema;
var mongoose = require('mongoose');
var PassportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    area: {type:String, default: 'NA'},
    name: {type:String, default: 'NA'},
    slot1: {type:Number, default: 1},
    slot2: {type:Number, default: 1},
    slot3: {type:Number, default: 1},
    slot4: {type:Number, default: 1},
    slot5: {type:Number, default: 1},
    slot6: {type:Number, default: 1},
});

UserSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
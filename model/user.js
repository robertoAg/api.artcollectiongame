var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    nickname: {
        type: String
    }
});
module.exports = mongoose.model('User', userSchema);
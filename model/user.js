var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    nickname: {
        type: String
    },
    artworks: [
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Artwork'
        }
    ]
});
module.exports = mongoose.model('User', userSchema);
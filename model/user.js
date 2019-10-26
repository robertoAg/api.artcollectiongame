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
    ],
    points: {
        type: Number
    },
    coins: {
        type: Number
    },
    premiumCoins: {
        type: Number
    },
    boxes: [
        {
            type: mongoose.Schema.Types.Mixed
        }
    ]
});
module.exports = mongoose.model('User', userSchema);
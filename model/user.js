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
            // id
            // type
        }
    ],
    matches: [
        {
            type: mongoose.Schema.Types.Mixed
            // date (String)
            // result (String)
            // gameId
        }
    ],
    artistsOpen: [
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Artist'
        }
    ],
    gamesOpen: [
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Game'
        }
    ]
});
module.exports = mongoose.model('User', userSchema);
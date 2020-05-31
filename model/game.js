var mongoose = require('mongoose');
var userSchema = mongoose.Schema({    
    name: {
        type: String
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artwork'
    },
    config: [
        {
            type: mongoose.Schema.Types.Mixed
        }
    ],
    ranking: [
        {
            type: mongoose.Schema.Types.Mixed
            // user -> nickname
            // result (String)
        }
    ]
});
module.exports = mongoose.model('Game', userSchema);
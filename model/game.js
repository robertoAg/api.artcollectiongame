var mongoose = require('mongoose');
var userSchema = mongoose.Schema({    
    name: {
        type: String
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
    },
    config: [
        {
            type: mongoose.Schema.Types.Mixed
        }
    ]
});
module.exports = mongoose.model('Game', userSchema);
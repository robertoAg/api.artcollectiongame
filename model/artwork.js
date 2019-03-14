var mongoose = require('moongose');
var artworkSchema = moongose.Schema({
    name: {
        type: String
    },
    skuName: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: String
    },
    dimensions: {
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    },
    style: {
        type: String
    },
    period: {
        type: String
    },
    media: {
        type: [String]
    },
    location:{
        name: {
            type: mongoose.Schema.Types.Mixed
        },
        place: {
            city: {
                type: mongoose.Schema.Types.Mixed
            },
            country: {
                type: mongoose.Schema.Types.Mixed
            }
        }
    },
    artist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist'
    }
});
mondule.exports = moongose.model('Artwork', artworkSchema);
var mongoose = require('mongoose');
var artworkSchema = mongoose.Schema({
    name: {
        type: String
    },
    skuName: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        es:  String,
        en: String
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
    },
    popularity: {
        type: Number,
        min: 0,
        max: 100
    },
    description: [
        {
            es: {
                type: String
            }
        }
    ]
});
module.exports = mongoose.model('Artwork', artworkSchema);
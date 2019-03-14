var mongoose = require('moongose');
var artistSchema = moongose.Schema({
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    skuName: {
        type: String,
        required: true,
        unique: true
    },
    birth: {
        date: {
            type: String
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
    death: {
        date: {
            type: String
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
    biography: [
        {
            date: {
                type: String
            },
            place: {
                city: {
                    type: mongoose.Schema.Types.Mixed
                },
                country: {
                    type: mongoose.Schema.Types.Mixed
                }
            },
            fact: {
                type: mongoose.Schema.Types.Mixed
            }  
        }
    ],
    popularity: {
        type: Number,
        min: 0,
        max: 100
    },
    artworks: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Artwork'
    }
});
mondule.exports = moongose.model('Artist', artistSchema);
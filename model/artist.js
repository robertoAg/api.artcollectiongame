var mongoose = require('mongoose');
var artistSchema = mongoose.Schema({
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
            year: {
                type: String
            },
            month: {
                type: String
            },
            day: {
                type: String
            }
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
            year: {
                type: String
            },
            month: {
                type: String
            },
            day: {
                type: String
            }
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
                year: {
                    type: String
                },
                month: {
                    type: String
                },
                day: {
                    type: String
                }
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
                es: {
                    type: String
                }
            }  
        }
    ],
    popularity: {
        type: Number,
        min: 0,
        max: 100
    },
    artworks: [
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Artwork'
        }
    ]
});
module.exports = mongoose.model('Artist', artistSchema);
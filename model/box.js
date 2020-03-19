var mongoose = require('mongoose');
var boxSchema = mongoose.Schema({
    id: {
        type: Number
    },
    type: {
        type: Number,
        min: 1,
        max: 4
    },
});
module.exports = mongoose.model('Box', boxSchema);
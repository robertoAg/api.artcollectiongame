const util = require('util');

exports.index = function (req, res, next) {
    Artist
        .find(req.query)
        .populate('artworks', 'name skuName year')
        .exec((err, results) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Artists retrieved successfully",
                data: results
            });
    });
};

// Handle create artist actions
exports.new = function (req, res) {
    var artist = new Artist();
    artist.name = req.body.name;
    artist.fullName = req.body.fullName;
    artist.skuName = req.body.skuName;
    artist.birth = req.body.birth;
    artist.death = req.body.death;
    artist.biography = req.body.biography;
    artist.popularity = req.body.popularity;
    artist.artworks = req.body.artworks;
// save the artist and check for errors
    artist.save(function (err) {
        if (err) {
            res.json(err);
        }else{
            res.json({
                message: 'New artist created!',
                data: artist
            });
        }
    });
};

// Handle view artist info
exports.view = function (req, res) {
    Artist.findById(req.params.artist_id, function (err, artist) {
        if (err)
            res.send(err);
        res.json({
            message: 'Artist details loading..',
            data: artist
        });
    });
};

// Handle update artist info
exports.update = function (req, res) {
    Artist.findOneAndUpdate({_id:req.params.artist_id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, { error: err });
        return res.json({
            message: 'succesfully saved'
        });
    });
};

// Handle delete artist
exports.delete = function (req, res) {
    Artist.remove({
        _id: req.params.artist_id
    }, function (err, artist) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Artist deleted'
        });
    });
};
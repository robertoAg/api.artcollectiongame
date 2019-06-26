const util = require('util');

exports.index = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.warn(req.query);
    Artwork
        .find(req.query)
        .populate('artist')
        .exec((err, results) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Artworks retrieved successfully",
                data: results
            });
    });
};

// Handle create artwork actions
exports.new = function (req, res) {
    var artwork = new Artwork();
    artwork.name = req.body.name;
    artwork.skuName = req.body.skuName;
    artwork.year = req.body.year;
    artwork.dimensions = req.body.dimensions;
    artwork.style = req.body.style;
    artwork.period = req.body.period;
    artwork.media = req.body.media;
    artwork.location = req.body.location;
    artwork.artist = req.body.artist;
// save the artwork and check for errors
// TODO save artwork _id also on artist.artworks[]
    artwork.save(function (err) {
        if (err) {
            res.json(err);
        }else{
            res.json({
                message: 'New artwork created!',
                data: artwork
            });
        }
    });
};

// Handle view artwork info
exports.view = function (req, res) {
    Artwork.findById(req.params.artwork_id, function (err, artwork) {
        if (err)
            res.send(err);
        res.json({
            message: 'Artwork details loading..',
            data: artwork
        });
    });
};

// Handle update artwork info
exports.update = function (req, res) {
    Artwork.findById(req.params.artwork_id, function (err, artwork) {
        var artwork = new Artwork();
        artwork.name = req.body.name;
        artwork.skuName = req.body.skuName;
        artwork.year = req.body.year;
        artwork.dimensions = req.body.dimensions;
        artwork.style = req.body.style;
        artwork.period = req.body.period;
        artwork.media = req.body.media;
        artwork.location = req.body.location;
        artwork.artist = req.body.artist;
// save the artwork and check for errors
        artwork.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Artwork Info updated',
                data: artwork
            });
        });
    });
};

// Handle delete artwork
exports.delete = function (req, res) {
    Artwork.remove({
        _id: req.params.artwork_id
    }, function (err, artwork) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Artwork deleted'
        });
    });
};
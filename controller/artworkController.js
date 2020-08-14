const util = require('util');

exports.index = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Artwork
        .find(req.query)
        .populate('artist', 'name')
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
    artwork.title.es = (req.body.title)? req.body.title.es : '';
    artwork.title.en = (req.body.title)? req.body.title.en : '';
    artwork.year = req.body.year;
    artwork.dimensions = req.body.dimensions;
    artwork.style = req.body.style;
    artwork.period = req.body.period;
    artwork.media = req.body.media;
    artwork.location = req.body.location;
    artwork.artist = req.body.artist;
    artwork.popularity = req.body.popularity;
    artwork.description = req.body.description;
// save the artwork and check for errors
    artwork.save(function (err) {
        if (err) {
            res.json(err);
        }else{
            Artist.findById(req.body.artist, function (err, artist) {
                if(artist.artworks.indexOf(artwork.id) === -1) {
                    artist.artworks.push(artwork.id)
                    artist.save();
                }
            })
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
    Artist.findOne({artworks:req.body._id}, function(err, artist) {
        artist.artworks = artist.artworks.filter(item => { return item != req.body._id; });
        artist.save();
        
        Artwork.findOneAndUpdate({_id:req.params.artwork_id}, req.body, {upsert: true}, function(err, doc) {
            Artist.findById(req.body.artist, function (err, artist) {
                if(artist.artworks.indexOf(req.params.artwork_id) === -1) {
                    artist.artworks.push(req.params.artwork_id)
                    artist.save();
                }
            })
            if (err) return res.send(500, { error: err });
            return res.json({
                message: 'succesfully saved',
                data: doc
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
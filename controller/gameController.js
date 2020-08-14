const util = require('util');

exports.index = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Game
        .find(req.query)
        .populate('artist', 'name')
        .populate('artwork', 'skuName')
        .exec((err, results) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Games retrieved successfully",
                data: results
            });
    });
};

// Handle create game actions
exports.new = function (req, res) {
    var game = new Game();
    game.name = req.body.name;
    game.artist = req.body.artist;
    game.artwork = req.body.artwork;
    game.config = req.body.config;
    // save the game and check for errors
    game.save(function (err) {
        if (err) {
            res.json(err);
        }else{
            res.json({
                message: 'New game created!',
                data: game
            });
        }
    });
};

// Handle view game info
exports.view = function (req, res) {
    Game.findById(req.params.game_id, function (err, game) {
        if (err)
            res.send(err);
        res.json({
            message: 'Game details loading..',
            data: game
        });
    });
};

// Handle update game info
exports.update = function (req, res) {
    Game.findOneAndUpdate({_id:req.params.game_id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.status(500).send({ error: err });
        return res.json({
            message: 'succesfully saved',
            data: req.body
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
    Game.remove({
        _id: req.params.game_id
    }, function (err, game) {
        if (err) return res.status(500).send({ error: err });
        res.json({
            status: "success",
            message: 'Game deleted'
        });
    });
};
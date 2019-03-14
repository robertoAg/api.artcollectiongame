let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to REST crafted with love!',
    });
});

var artistController = require('./../controller/artistController');
var artworkController = require('./../controller/artworkController');

router.route('/artist')
    .get(artistController.index)
    .post(artistController.new);
router.route('/artists/:artist_id')
    .get(artistController.view)
    .patch(artistController.update)
    .put(artistController.update)
    .delete(artistController.delete);

router.route('/artwork')
    .get(artworkController.index)
    .post(artworkController.new);
router.route('/artworks/:artwork_id')
    .get(artworkController.view)
    .patch(artworkController.update)
    .put(artworkController.update)
    .delete(artworkController.delete);
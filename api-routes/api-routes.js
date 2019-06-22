let router = require('express').Router();

var artistController = require('./../controller/artistController');
var artworkController = require('./../controller/artworkController');

router.route('/artist')
    .get(artistController.index)
    .post(artistController.new);
router.route('/artist/:artist_id')
    .get(artistController.view)
    .patch(artistController.update)
    .put(artistController.update)
    .delete(artistController.delete);

router.route('/artwork')
    .get(artworkController.index)
    .post(artworkController.new);
router.route('/artwork/:artwork_id')
    .get(artworkController.view)
    .patch(artworkController.update)
    .put(artworkController.update)
    .delete(artworkController.delete);
    
module.exports = router;
let router = require('express').Router();

var artistController = require('./../controller/artistController');
var artworkController = require('./../controller/artworkController');
var userController = require('./../controller/userController');

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

router.route('/user')
    .get(userController.index)
    .post(userController.new);
router.route('/user/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);
router.route('/user/:user_id/box')
    .post(userController.addBox);
router.route('/user/:user_id/box/:box_id')
    .put(userController.activateBox)
    .delete(userController.openBox);
    
module.exports = router;
const util = require('util');

exports.index = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    User
        .find(req.query)
        .exec((err, results) => {
            if (err) return res.status(500).send({ error: err });
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: results
            })
        });
};

exports.new = function (req, res) {
    var user = new User();
    user.nickname = req.body.nickname;
    user.artworks = req.body.artworks;
    user.points = req.body.points;
    user.coins = req.body.coins;
    user.premiumCoins = req.body.premiumCoins;
    // save the user and check for errors
    user.save(function (err) {
        if (err) return res.status(500).send({ error: err });
        res.json({
            message: 'New user created!',
            data: user
        });
    });
}

// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.status(500).send({ error: err });
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Handle update user info
exports.update = function (req, res) {
    User.findOneAndUpdate({_id:req.params.user_id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.status(500).send({ error: err });
        return res.json({
            message: 'succesfully saved'
        });
    });
};

// Handle delete user
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err) return res.status(500).send({ error: err });
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};

exports.addBox = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.status(500).send({ error: err });
        if(user && user.boxes.length < 4){

            //type
            const n = Math.floor(Math.random()*100);
            let type;
            if(n < 71){
                type = 1;
            }else if(n < 91){
                type = 2;
            }else if(n < 97){
                type = 3;
            }else if(n < 99){
                type = 4;
            }else{
                type = 5;
            }

            const box = {
                id: (user.boxes.length)? user.boxes[user.boxes.length - 1].id + 1 : 1,
                type: type
            }
            user.boxes.push(box);
            user.save(function (err) {
                if (err) {
                    res.json(err);
                }else{
                    res.json({
                        message: 'New box created!',
                        data: user
                    });
                }
            });
        }else{
            res.json({
                message: 'Boxes already full or user not found. Not created any box.',
                data: user
            });
        }
    });
}

exports.activateBox = function(req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.status(500).send({ error: err });
        if(user && user.boxes && req.params.box_id){
            let i = 0;
            let box_index;
            while(user.boxes.length > i){
                if(user.boxes[i].id === req.params.box_id * 1){
                    box_index = i;
                }
                if(user.boxes[i]['activatedTimestamp']){
                    return res.json({
                        message: 'Error - Box with id ' + user.boxes[i].id + ' actually started.',
                        data: user
                    });
                }
                i++;
            }

            if(box_index !== undefined) {
                user.boxes[box_index].activatedTimestamp = Date.now();
                user.markModified('boxes');
                user.save(function (err) {
                    if (err) return res.json(err);
                    return res.json({
                        message: 'Activated box with id ' + req.params.box_id + '.',
                        data: user
                    });
                });
            }else{
                return res.json({
                    message: 'Not found box with id ' + req.params.box_id + '.',
                    data: user
                });
            }
        }else{
            return res.json({
                message: 'Not found box with id ' + req.params.box_id + '.',
                data: user
            });
        }
    });
}

exports.openBox = function(req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) return res.status(500).send({ error: err });
        if(user.boxes && req.params.box_id){
            let box_index;
            let i = 0;
            while(user.boxes.length > i){
                if(user.boxes[i].id === req.params.box_id * 1){
                    box_index = i;
                }
                i++;
            }
            if(box_index !== undefined && user.boxes[box_index]['activatedTimestamp']){
                const diff = Date.now() - new Date(user.boxes[box_index]['activatedTimestamp']).getTime();
                const diffMin = Math.floor(diff/60000);
                let minNeeded;
                let prizeCoins;
                let prizePremiumCoins;
                if(user.boxes[box_index].type === 1){
                    minNeeded = 60 * 2;
                    prizeCoins = Math.floor(Math.random()*1000);
                    prizePremiumCoins = Math.floor(Math.random()*10);
                }else if(user.boxes[box_index].type === 2){
                    minNeeded = 60 * 8;
                    prizeCoins = Math.floor(Math.random()*1000*4);
                    prizePremiumCoins = Math.floor(Math.random()*10*4);
                }else if(user.boxes[box_index].type === 3){
                    prizeCoins = Math.floor(Math.random()*1000*6);
                    prizePremiumCoins = Math.floor(Math.random()*10*6);
                    minNeeded = 60 * 12;
                }else{
                    prizeCoins = Math.floor(Math.random()*1000*12);
                    prizePremiumCoins = Math.floor(Math.random()*10*12);
                    minNeeded = 60*24;
                }
                if(diffMin > minNeeded){
                    // prize
                    const prize = {
                        coins: prizeCoins,
                        premiumCoins: prizePremiumCoins
                    };
                    user.coins = ((user.coins)? user.coins : 0) + prizeCoins;
                    user.premiumCoins = ((user.premiumCoins)? user.premiumCoins : 0) + prizePremiumCoins;
                    // remove box
                    user.boxes.splice([box_index], 1);
                    user.markModified('boxes');
                    user.save(function (err) {
                        if (err) {
                            res.json(err);
                        }else{
                            res.json({
                                message: 'Open box with id ' + req.params.box_id + '.',
                                data: prize
                            });
                        }
                    });
                }else{
                    res.json({
                        message: 'Error - Box with id ' + req.params.box_id + ' not enough time active. Min active: ' + diffMin + ' Min needed:' + minNeeded,
                        data: user
                    });
                }
            }else{
                res.json({
                    message: 'Error - Box with id ' + req.params.box_id + ' inactivated.',
                    data: user
                });
            }
        }else{
            res.json({
                message: 'Error - Not found box with id ' + req.params.box_id + '.',
                data: user
            });
        }
    });
}
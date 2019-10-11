const util = require('util');

exports.index = function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    User
        .find(req.query)
        .exec((err, results) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
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
        if (err) {
            res.json(err);
        }else{
            res.json({
                message: 'New user created!',
                data: user
            });
        }
    });
}

// Handle view user info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Handle update user info
exports.update = function (req, res) {
    User.findOneAndUpdate({_id:req.params.user_id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, { error: err });
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
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};

exports.addBox = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if(user.boxes.length < 4){

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
                id: user.boxes.length + 1,
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
                message: 'Boxes already full. Not created any box.',
                data: user
            });
        }
    });
}
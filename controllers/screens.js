const Screens = require('../models/screens');
const Pusher = require('pusher');

var channels_client = new Pusher({
    appId: '785932',
    key: '715c895bb7ce1e7fa171',
    secret: 'd9882d9bf171816308ff',
    cluster: 'ap2',
    encrypted: true
});

exports.all = function(req, res) {
    Screens.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('screens',{
            screen:docs
        })
    });
};

exports.findByPlace = function(req, res) {
    var query = require('url').parse(req.url,true).query;
    var place = query.place;
    var num = query.num;
    Screens.findByPlace(place, num, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('play',{
            screen:doc,
            query:query.channel
        })
    });
};

exports.reload = function (req, res) {
    var query = require('url').parse(req.url,true).query;
    var num = query.num;
    var place = query.place;
    var content ="";
    console.log(req.params.channel);
    console.log(place);
    console.log(num);
    Screens.findByPlace(place, num, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        doc.forEach(function (doc){
            content += '<div class="item">'+doc.slide_content+'</div>';
        });
        console.log(content);
        channels_client.trigger(req.params.channel, 'my-event', {
            "message": content
        });
    });


};

exports.findById = function(req, res) {
    Screens.findById(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('screens_edit',{
            screen:doc
        })
    });
};

exports.create = function(req, res) {
    var screen = {
        place: req.body.place,
        screen_num: req.body.screen_num,
        slide_num: req.body.slide_num,
        isactive: req.body.isactive,
        slide_content: req.body.slide_content
    };
    Screens.create(screen, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.redirect('/screens');
    });
};

exports.update = function(req, res) {
    Screens.update(
        req.params.id,
        {
            place: req.body.place,
            screen_num: req.body.screen_num,
            slide_num: req.body.slide_num,
            isactive: req.body.isactive,
            slide_content: req.body.slide_content
        },
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log('Данные успешно обновлены!');
            res.redirect('/screens');
        }
    );
};

exports.delete = function(req, res) {
    Screens.delete(
        req.params.id,
        function(err, result) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.sendStatus(200);
        }
    );
};
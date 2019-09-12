const Screens = require('../models/screens');

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
    console.log(req.params.place);
    Screens.findByPlace({place: req.params.place}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.render('play',{
            screen:doc
        })
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
   /* console.log("place: " + req.body.place);
    console.log("s_num: " + req.body.screen_num);
    console.log("slide: " + req.body.slide_num);
    console.log("activ: " + req.body.isactive);
    console.log("contn: " + req.body.slide_content);*/
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
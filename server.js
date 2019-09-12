var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var errorhandler = require('errorhandler');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var db = require('./db');

var placesController = require('./controllers/places');
var screensController = require('./controllers/screens');
var tvsController = require('./controllers/tvs');

var app = express();
var methodOverride = require('method-override');

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(methodOverride('_method'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*pusher*/
var Pusher = require('pusher');
var channels_client = new Pusher({
    appId: '785932',
    key: '715c895bb7ce1e7fa171',
    secret: 'd9882d9bf171816308ff',
    cluster: 'ap2',
    encrypted: true
});

channels_client.trigger('my-channel', 'my-event', {
    "message": "hello world"
});
/**/

app.get('/add_screen/', function(req, res) {
    res.render('screens_add',{
       // id: req.params.id
    });
});
app.get('/add_place/', function(req, res) {
    res.render('places_add',{
        // id: req.params.id
    });
});
app.get('/add_tv/', function(req, res) {
    res.render('tvs_add',{
        // id: req.params.id
    });
});

app.get('/places', placesController.all);
app.get('/places/:id', placesController.findById);
app.post('/places', placesController.create);
app.put('/places/:id', placesController.update);
app.delete('/places/:id', placesController.delete);

app.get('/play/:place', screensController.findByPlace); /*OK Посмотреть все слайды*/

app.get('/screens', screensController.all); /*OK Посмотреть все слайды*/
app.get('/screens/:id', screensController.findById); /*OK Открыть один конкретный слайд*/
app.post('/screens', screensController.create); /*OK Создать новый слайд*/
app.put('/screens/:id', screensController.update); /*OK Обновить слайд*/
app.delete('/screens/:id', screensController.delete); /*OK Удалить слайд*/

app.get('/', tvsController.indexall);
app.get('/tvs', tvsController.all);
app.get('/tvs/:id', tvsController.findById);
app.post('/tvs', tvsController.create);
app.put('/tvs/:id', tvsController.update);
app.delete('/tvs/:id', tvsController.delete);
/*
app.use(function (req, res) {
   res.send(404, 'Page not found');
});*/

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler({ log: errorNotification }))
}

function errorNotification (err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url

    notifier.notify({
        title: title,
        message: str
    })
}

db.connect('mongodb://localhost:27017/tvscreens', function(err) {
    if (err) {
        return console.log(err);
    }
    app.listen(3012, function() {
        console.log('API app started');
    });
});
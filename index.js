var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.sendFile('form.html', { root: __dirname + "/public" });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post("/getRate", function (req, res) {
    console.log(req.body.weight);
    console.log(req.body.type);
    calculateRate(req, res);
});

function calculateRate(req, res) {

    var rate = undefined;

    if (req.body.type === "Letters (Stamped)") {

        if (req.body.weight <= 1)
            rate = 0.49;
        else if (req.body.weight <= 2)
            rate = 0.70;
        else if (req.body.weight <= 3)
            rate = 0.91;
        else
            rate = 1.12;

    }

    if (req.body.type === "Letters (Metered)") {

        if (req.body.weight <= 1) {
            rate = 0.46;
        } else if (req.body.weight <= 2) {
            rate = 0.67;
        } else if (req.body.weight <= 3) {
            rate = 0.88;
        } else {
            rate = 1.09;
        } 
    }

    if (req.body.type === "Large Envelopes (Flats)") {

        if (req.body.weight <= 1) {
            rate = 0.98;
        } else if (req.body.weight <= 2) {
            rate = 1.19;
        } else if (req.body.weight <= 3) {
            rate = 1.40;
        } else if (req.body.weight <= 4) {
            rate = 1.61;
        } else if (req.body.weight <= 5) {
            rate = 1.82;
        } else if (req.body.weight <= 6) {
            rate = 2.03;
        } else if (req.body.weight <= 7) {
            rate = 2.24;
        } else if (req.body.weight <= 8) {
            rate = 2.45;
        } else if (req.body.weight <= 9) {
            rate = 2.66;
        } else if (req.body.weight <= 10) {
            rate = 2.87;
        } else if (req.body.weight <= 11) {
            rate = 3.08;
        } else if (req.body.weight <= 12) {
            rate = 3.29;
        } else {
            rate = 3.50;
        }
    }

    if (req.body.type === "Parcels") {

        if (req.body.weight <= 4) {
            rate = 2.67;
        } else if (req.body.weight <= 5) {
            rate = 2.85;
        } else if (req.body.weight <= 6) {
            rate = 3.03;
        } else if (req.body.weight <= 7) {
            rate = 3.21;
        } else if (req.body.weight <= 8) {
            rate = 3.39;
        } else if (req.body.weight <= 9) {
            rate = 3.57;
        } else if (req.body.weight <= 10) {
            rate = 3.75;
        } else if (req.body.weight <= 11) {
            rate = 3.93;
        } else if (req.body.weight <= 12) {
            rate = 4.11;
        } else {
            rate = 4.29;
        }
    }

    params = {weight: req.body.weight, type: req.body.type, rate: rate};
    res.render('pages/results', params);
}
// require express and other modules
var express = require('express'),
    app = express();

var db = require('./models');
// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * hardcoded *
 ************/

// NOTE: Project

let profileInfo =
{
 name: "James Silvester",
 githubLink: "https://github.com/jamesrsilvester",
 githubProfileImage: "https://avatars1.githubusercontent.com/u/6411628?v=4&s=460",
 personalSiteLink: "https://jamesrsilvester.github.io/",
 currentCity: "SF"
};

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// NOTE: Links to INDEX.HTML
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoint Documentation
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/jamesrsilvester/express-personal-api/blob/master/README.md", // CHANGED
    baseUrl: "https://peaceful-taiga-87399.herokuapp.com/", // CHANGED
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "POST", path: "/api/places", description: "E.g. Create a new place"},
      {method: "GET", path: "/api/places", description: "E.g. See all places"},
      {method: "GET", path: "/api/places/:id", description: "E.g. See one new place"}
    ]
  })
});

/*
 * JSON API Endpoints
 */

 //PROFILE
 app.get('/api/profile', function apiIndex(req, res) {
   res.json(profileInfo)
 });

 //POST ONE PLACE
 app.post('/api/places', function apiIndex(req, res) {
   // create new place with form data (`req.body`)
    console.log('create place', req.body);
    var newPlace = new db.Place(req.body);
    newPlace.save(function handlePlaceSaved(err, savedPlace) {
      res.json(savedPlace);
    });
 });

// GET ALL PLACES
app.get('/api/places', function apiIndex(req, res) {
  // send all places as JSON response
  db.Place.find(function(err, places){
    if (err) { return console.log("index error: ", err); }
    res.json(places);
  });
});

// GET ONE PLACE
app.get('/api/places/:id', function apiIndex(req, res) {
  db.Place.findOne({_id: req.params.id }, function(err, data) {
  res.json(data);
  });
});

// MODIFY ONE PLACE
app.put('/api/places/:id', function (req, res) {
  // get place id from url params (`req.params`)
  console.log('attemping to update place', req.params.id);
  // find the index of the place we want to remove
  db.Place.findById(req.params.id, function(err, updatedPlace) {
    updatedPlace.name = req.body.name || updatedPlace.name;
    updatedPlace.save();
    res.json(updatedPlace);
    console.log('successfully updated place', req.params.id);
  });
});

// DELETE ONE PLACE
app.delete('/api/places/:id', function (req, res) {
  // get place id from url params (`req.params`)
  console.log('delete place', req.params);
  // find the index of the place we want to remove
  db.Place.findOneAndRemove({ _id: req.params.id }, function(err, deletedPlace) {
    res.json(deletedPlace);
  });
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});

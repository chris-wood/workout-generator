// Import required modules.
var express = require('express');
var stormpath = require('express-stormpath');
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/workouts');

var BodyGroupSchema = {
  name: String
}

var ExerciseSchema = {
	name: String,
	groups: [BodyGroupSchema]
}

var SetExerciseSchema = {
  exercise: ExerciseSchema,
  reps: Number
}

var SetSchema = {
  name: String,
  exercises: [SetExerciseSchema],
  intra_rest: Number,
  cycle_rest: Number
}

var RoutineSchema = {
  name: String,
  exercises: [SetSchema]
};

// TODO: need to incorporate plans, which have (possibly finite) sequences of routines

var Routine = mongoose.model('Routine', RoutineSchema, 'routines');

// Initialize our Express app
var app = express();

// Use Jade for rendering
app.set('view engine', 'jade');

var workoutsURI = '/workouts';

// Configure Stormpath.
var stormpathMiddleware = stormpath.init(app, {
  apiKeyFile: '/Users/caw/.stormpath/workoutsApiKey.properties',
  application: 'https://api.stormpath.com/v1/applications/1UgjEWgfx06H9iHNaYNTWE',
  secretKey: 'RANDOMTHINGMKAYOKAY',
  expandCustomData: true,
  enableForgotPassword: true
});

app.use(stormpathMiddleware);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Generate a simple home page.
app.get('/', function(req, res) {
  res.redirect(workoutsURI);
});

// Generate a simple dashboard page.
app.get(workoutsURI, stormpath.loginRequired, function(req, res) {
  res.render('index', { 
    title: 'Hey', 
    message: 'Hello there!',
    groups: ['group A', 'group B', 'group C']
  });

  // Question.find({}, function (err, questions) {
  // 	var qotd = questions[0];
  // 	res.json(qotd);
  // });
});

// Record a new answer
// app.get('/answer', function(req, res) {
	// var qid = req.query.questionId;
	// var aid = req.query.answerId;
 //  console.log(qid + "  " + aid);
	// var query = { questionId : parseInt(qid) };
	// Question.find(query, function (err, questions) {
 //  		var qotd = questions[0];
 //  		var answerIndex = 0;
 //  		if (qotd != null) {
 //  			for (var i = 0; i < qotd.answers.length; i++) {
	//   			if (qotd.answers[i].answerId == aid) {
	//   				qotd.answers[i].count++;
	//   				qotd.save();
	//   				res.json(qotd);
 //            console.log(qotd);
	//   				break;
	//   			}
	//   		}
 //  		}
 //  	});
// });

// Listen for incoming requests and serve them.
app.listen(process.env.PORT || 3000);

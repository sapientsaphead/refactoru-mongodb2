
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// connect to MongoDB via Mongoose
mongoose.connect('mongodb://localhost/omega3studios');
var Applicant = mongoose.model('Applicant', {name: String, bio: String, skills: String, years: Number, why: String});

//renders the index page
app.get('/', function(req, res){
	res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){
	// res.render('applicants')
	// res.render('/applicants', {applicant: req.body})
	Applicant.find({}, function(err, applicants){
        
        if(err){
            res.send(err)
        }
        else {
            console.log('send it')
            res.render('applicants', {applicants: applicants})
        }   
    });
});



// creates an applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it
	console.log(req.body);
	// res.send({success: 'Success!'});

	var developerApplicant = new Applicant (
		{name: req.body.name, 
		bio: req.body.bio,
		skills: req.body.skills,
		years: req.body.years,
		why: req.body.why}
	)

	developerApplicant.save(function(err) {
		if(err) {
			res.send(err)
		}
		else {
			Applicant.find({}, function(err, applicantsData) {
				res.send({ message: "Your application as been submitted",
						   applicant: applicantsData
						});
			})
		}
	});
	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

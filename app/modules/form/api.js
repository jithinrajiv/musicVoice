var express = require('express');
var router = require('express').Router();
var bodyParser = require('body-parser');
var Course = require('./models/major.js')
var app = express();
var mongojs = require('mongojs');
var db = mongojs('jeff:nissan12@ds041934.mongolab.com:41934/heroku_q1kmjcbd', ['courses'], {authMechanism: 'ScramSHA1'});
app.use(bodyParser.json());
router.use(bodyParser.json())

// [AUDIT] getting major
app.get('/major', function (req, res) {
  db.courses.find(function (err, db) {
    res.json(db);
  });
});


app.get('/find', function (req, res) {
  db.courses.find(function (err, db) {
    res.json(db);
  });
});


//get the database
app.get('/courses', function (req, res) {
  db.courses.find(function (err, db) {
    res.json(db);
  });
});

//delete from database
app.delete('/courses/:id', function (req, res) {
  var id = req.params.id;
  db.courses.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    res.status(204).end();

  });
});

//get data from database by ID
app.get('/courses/:id', function (req, res) {
  var id = req.params.id;
  db.courses.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//get data from database by ID

//update the database
app.put('/courses/:id', function (req, res) {
  var id = req.params.id;
  db.courses.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {
            major: req.body.major,
			course: req.body.course,
			description: req.body.description,
			rubric: req.body.rubric,
			title: req.body.title,
			grade: req.body.grade,
			dueDate: req.body.dueDate,
			rubricdescription: req.body.rubricdescription
                    }
            },
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});


//save to database
app.post('/post', function (req,res) {

	var course = new Course({
			major: req.body.major,
			course: req.body.course,
			description: req.body.description,
			rubric: req.body.rubric,
			title: req.body.title,
			grade: req.body.grade,
			dueDate: req.body.dueDate,
			rubricdescription: req.body.rubricdescription

	})
//save the course into the db
	course.save(function(){
  		res.json(req.body);
  		return course;

	})
})
//getting the post object
module.exports = app

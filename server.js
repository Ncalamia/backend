// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const Msaschema = require('./models/msaschema.js')
const Forumschema = require('./models/forumschema.js')
const Senatorschema = require('./models/senatorschema.js')
const seedMSA = require('./models/msadata.js')
const seedForum = require('./models/forumdata.js')
const seedSenator = require('./models/senatordata.js')
require('dotenv').config()

// CONNECTIONS
// mongoose.connect('mongodb://localhost:27017/app')
// mongoose.connection.once('open', () => {
//     console.log('connected to mongod...')
// })

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
	console.log('connected to mongo')
})


// MIDDLEWARE
app.use(express.json())
app.use(cors())


// RESTful CRUD ROUTES

//Creating seed data for mass shootings
app.get('/project3/seed', (req, res) => {
    Msaschema.create(seedMSA, (err, createdMSAData) => {
        res.json(createdMSAData)
    })
})
//Creating seed data for forumn
app.get('/project3/seedforum', (req, res) => {
    Forumschema.create(seedForum, (err, createdForumData) => {
        res.json("createdForumData")
    })
})

//Creating seed data for senators
app.get('/project3/seedsenator', (req, res) => {
    Senatorschema.create(seedSenator, (err, createdSenatorData) => {
        res.json(createdSenatorData)
    })
})


// Create new forum post
app.post('/project3/forum', (req, res) => {
  Forumschema.create(req.body, (err, createdForumPost) => {        res.json(createdForumPost)
    })
})


//Route for home page, shows msa data and forum data
app.get('/project3', (req, res) => {
	Msaschema.find({}, (err, shooting) => {
		Forumschema.find({}, (err, thoughts) => {
      Senatorschema.find({}, (err, senator) => {
	     res.json(
				 {
				 shooting,
				 thoughts,
         senator
			 }
			)
  })
  })
  })
})

// Update forum post
app.put('/project3/forum/:id', (req, res) => {
    Forumschema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedForumPost) => {
        res.json(updatedForumPost)
    })
})

// Delete forum post
app.delete('/project3/forum/:id', (req, res) => {
    Forumschema.findByIdAndRemove(req.params.id, (error, deletedForumPost) => {
        res.json(deletedForumPost)
    })
})


//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/project3');
});

//___________________
//Listener
//___________________

app.listen(PORT, () => console.log( 'Listening on port:', PORT));


// mongoose.connect(MONGODB_URI  ,  { useNewUrlParser: true});

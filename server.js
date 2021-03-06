// DEPENDENCIES
require('dotenv').config()
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


// const db = moongoose.connection


// CONNECTIONS
// mongoose.connect('mongodb://localhost:27017/app')
// mongoose.connection.once('open', () => {
//     console.log('connected to mongod...')
// })



// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3001;
// mongoose.connect( MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT

//___________________
//Database
//___________________



// How to connect to the database either via heroku or locally
// const MONGODB_URI = process.env.MONGODB_URI;


// Connect to Mongo &
mongoose.connect(MONGODB_URI , () => {
	console.log('connected to mongo')
})


app.set("port",process.env.PORT || 3000)

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
	console.log(req.body);
    Forumschema.create(seedForum, (err, createdForumData) => {
        res.json(createdForumData)
console.log(createdForumData);
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
  Forumschema.create(req.body, (err, createdForumPost) => {
		res.json(createdForumPost)
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
         senator,
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
// Update MSA
app.put('/project3/msa/:id', (req, res) => {
    Msaschema.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedMsaPost) => {
        res.json(updatedMsaPost)
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

app.listen(app.get('port'), ()=>{console.log(`"listening on ${app.get('port')}"`)
})

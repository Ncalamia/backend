// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// const db = moongoose.connection
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
// app.post('/app/seed', (req, res) => {
//     Creature.create(seedData, (error, createdSeedData) => {
//         res.json(createdSeedData)
//     })
// })
//
// app.post('/app', (req, res) => {
//     Creature.create(req.body, (error, createdApp) => {
//         res.json(createdApp)
//     })
// })

app.get('/', (req, res) => {
			res.send('Hello World')
        // res.json(foundApp)
})

// app.put('/app/:id', (req, res) => {
//     Creature.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedApp) => {
//         res.json(updatedApp)
//     })
// })
//
// app.delete('/app/:id', (req, res) => {
//     Creature.findByIdAndRemove(req.params.id, (error, deletedApp) => {
//         res.json(deletedApp)
//     })
// })

//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.redirect('/');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

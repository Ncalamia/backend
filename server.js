// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// CONNECTIONS
mongoose.connect('mongodb://localhost:27017/app')
mongoose.connection.once('open', () => {
    console.log('connected to mongod...')
})


// MIDDLEWARE
app.use(express.json())
app.use(cors())


// RESTful CRUD ROUTES
app.post('/app/seed', (req, res) => {
    Creature.create(seedData, (error, createdSeedData) => {
        res.json(createdSeedData)
    })
})

app.post('/app', (req, res) => {
    Creature.create(req.body, (error, createdApp) => {
        res.json(createdApp)
    })
})

app.get('/app', (req, res) => {
    Creature.find({}, (error, foundApp) => {
        res.json(foundApp)
    })
})

app.put('/app/:id', (req, res) => {
    Creature.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedApp) => {
        res.json(updatedApp)
    })
})

app.delete('/app/:id', (req, res) => {
    Creature.findByIdAndRemove(req.params.id, (error, deletedApp) => {
        res.json(deletedApp)
    })
})

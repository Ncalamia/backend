const mongoose = require('mongoose')


const Forumschema = new mongoose.Schema({
  username: String,
  avatar: String,
  comment: {type: String, required: true},
  emoji: String
})

const forumcollection = mongoose.model("forumcollection", Forumschema)
module.exports = forumcollection

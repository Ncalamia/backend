const mongoose = require('mongoose')

const Senatorschema = new mongoose.Schema (
  {
		state: String,
		name: String,
		party: String,
		email: String,
		phone: String,
		leaning: String,
		funding: String,
		image:String
  }
)

const senatorcollection = mongoose.model("senatorcollection", Senatorschema)
module.exports = senatorcollection

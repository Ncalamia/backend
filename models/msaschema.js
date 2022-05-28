const mongoose = require('mongoose')

const Msaschema = new mongoose.Schema (
  {
    case: String,
    location: String,
    date: String,
    summary: String,
    fatalities: Number,
    injured: Number,
    total_victims: Number,
    location__1: String,
    age_of_shooter: Number,
    prior_signs_mental_health_issues: String,
    race: String,
    gender: String,
    sources: String,
  }
)

const msacollection = mongoose.Model("msacollection", Msaschema)
module.exports = msacollection

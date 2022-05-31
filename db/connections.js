const mongoose = require('mongoose')
require('dotenv').config()
// connection to mongo atlas
const MONGODB_URI = process.env.MONGODB_URI;
// connection to local
const PORT = process.env.PORT || 3001;
mongoose
  .connect( MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // The connect method is asynchronous, so we can use
  // .then/.catch to run callback functions
  // when the connection is opened or errors out.
  .then((instance) =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch((error) => console.log('Connection failed!', error));
// Export mongoose so we can use it elsewhere
module.exports = mongoose;

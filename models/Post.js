const mongoose = require('mongoose')

// schema
const PostSchema = new mongoose.Schema({
  image: {type: String, required: true},
    caption: String,
    location: String,
    // comment: String,
    
}, {timespan: true})

const Post = mongoose.model("Post", PostSchema)

module.exports = Post
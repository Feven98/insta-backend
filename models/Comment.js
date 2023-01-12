// import mongoose

const mongoose = require('mongoose')

// create a schema variable/ object
const CommentSchema = new mongoose.Schema({
   comment: {type: String, required: [true, "need an comment"]},
   body: String,
   person: {
    type: mongoose.Types.ObjectId, ref: "Post"
   }

},  {timestamps: true})



// create a model w/ collection identifier
const Comment = mongoose.model("Comment", CommentSchema)


// export it 
module.exports = Comment
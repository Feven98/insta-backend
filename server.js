// import express
const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan')

// controller import
const postController = require('./controllers/post-controller')

require("dotenv").config()
require('./config/db.connection') // node runs all of code in db.connection

const { PORT, MONGODB_URI } = process.env

// app middleware(express)
app.use(express.json())

// cors function
app.use(cors())
// morgan function
app.use(morgan('dev'))

// router middleware
app.use('/post', postController)
// root router
app.get('/', (req,res) => res.redirect('/post'))
app.listen(PORT, () => console.log(`Listening for client requests on port: ${PORT}`));
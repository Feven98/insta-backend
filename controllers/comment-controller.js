// DEPENDENCIES
const express = require('express')
const router = express.Router()

// import model {post}
const {Comment} = require('../models')
const db = require('../models')
console.log(Comment)

// ROUTES
// INDEX route
router.get('/', async (req,res)=>{
    // res.status(200).json({message: "insta index route"})
    try{
        const allComment = await Comment.find({})
		// .find({}).populate('owner', 'username -_id').exec()
        res.status(200).json(allComment)
    } catch(err){
        res.status(400).json({error: err})
    }
})

// Create route
router.post('/',  async (req,res)=>{
    // console.log('post route', req.body)
    try{
        // const owner = req.home._id
        // console.log(owner, req.home)
        // req.body.owner = owner
        const newComment= await Comment.create(req.body)
        res.status(201).json(newComment)

    } catch(err){
        res.status(400).json({error: err.message})
    }
    // res.status(200).json({message: "insta create/post route"})
})

// SHOW/GET route
router.get('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta show/get route"})
    try{
        const showComment= await Comment.findById(req.params.id)
        res.status(201).json(showComment)
    } catch(err){
        res.status(400).json({error:err})
    }
})
// DELETE route
router.delete('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta delete/destory route"})
    try{
        // handleValidateOwnership(req, await User.findByIdAndDelete(req.params.id))
        const deletedComment = await Comment.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedComment)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
// UPDATE/PUT route
router.put('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta updatte/put route"})
    try {
        // handleValidateOwnership(req, await User.findByIdAndDelete(req.params.id))
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedComment)
    } catch(err) {
        res.status(400).json({error:err})
    }
})



module.exports = router

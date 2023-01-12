// DEPENDENCIES
const express = require('express')
const router = express.Router()

// import model {post}
const {Post} = require('../models')
const {handleValidateOwnership, requireToken} = require('../middleware/auth')
const db = require('../models')
console.log(Post)

// ROUTES
// INDEX route
router.get('/', async (req,res)=>{
    // res.status(200).json({message: "insta index route"})
    try{
        const allPost = await Post.find({}).populate('owner', 'username -_id').exec()
		// .find({}).populate('owner', 'username -_id').exec()
        res.status(200).json(allPost)
    } catch(err){
        res.status(400).json({error: err})
    }
})

// Create route
router.post('/',  requireToken, async (req,res)=>{
    // console.log('post route', req.body)
    try{
        const owner = req.user._id
        console.log(owner, req.home)
        req.body.owner = owner
        const newPost= await Post.create(req.body)
        res.status(201).json(newPost)

    } catch(err){
        res.status(400).json({error: err.message})
    }
    // res.status(200).json({message: "insta create/post route"})
})

// SHOW/GET route
router.get('/:id', async (req,res)=>{
    // res.status(200).json({message: "insta show/get route"})
    try{
        const showPost= await Post.findById(req.params.id).populate('owner').exec()
        res.status(201).json(showPost)
    } catch(err){
        res.status(400).json({error:err})
    }
})
// DELETE route
router.delete('/:id', requireToken, async (req,res)=>{
    // res.status(200).json({message: "insta delete/destory route"})
    try{
        handleValidateOwnership(req, await Post.findByIdAndDelete(req.params.id))
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.status(201).json(deletedPost)
    } catch(err) {
        res.status(400).json({error:err})
    }
})
// UPDATE/PUT route
router.put('/:id', requireToken, async (req,res)=>{
    // res.status(200).json({message: "insta updatte/put route"})
    try {
        handleValidateOwnership(req, await User.findByIdAndDelete(req.params.id))
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(201).json(updatedPost)
    } catch(err) {
        res.status(400).json({error:err})
    }
})



module.exports = router

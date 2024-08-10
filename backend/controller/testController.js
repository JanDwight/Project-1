const asyncHandler = require('express-async-handler')

const testModel = require('../models/testModel')
const User = require('../models/userModel')

// @desc Get Test
// @route GET /api/gettest
// @access Private
const getTest = asyncHandler (async (req, res) => {
    // Get the data of the specific user with the ID
    const testM = await testModel.find({ user: req.user.id })
    
    res.status(200).json(testM)
})

// @desc Create Test
// @route POST /api/gettest
// @access Private
const createTest = asyncHandler (async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const testM = await testModel.create({
        text: req.body.text,
        // Associate the data to the user
        user: req.user.id
    })
    
    res.status(200).json(testM)
})

// @desc Update Test
// @route PUT /api/gettest:id
// @access Private
const updateTest = asyncHandler (async (req, res) => {
    const testUpdate = await testModel.findById(req.params.id)

    if(!testUpdate) {
        res.status(401)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matched the test user
    if(testUpdate.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const testM = await testModel.findByIdAndUpdate(req.params.id, req.body, {new: true,})



    res.status(200).json(testM)
})

// @desc Delete Test
// @route DELETE /api/gettest:id
// @access Private
const deleteTest = asyncHandler (async (req, res) => {
    const testUpdate = await testModel.findById(req.params.id)

    if (!testUpdate) {
        res.status(400)
        throw new Error('testModel not found')
    }

    const user = await User.findById(req.user.id)

    // Check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the test user
    if(testUpdate.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await testUpdate.deleteOne()

    res.status(200).json({ id: req.params.id })
})

// ???-- Is there a way to put all this and export the class --???
module.exports = {
    getTest,
    createTest,
    updateTest,
    deleteTest
}
const asyncHandler = require('express-async-handler')
const testModel = require('../models/testModel')

// @desc Get Test
// @route GET /api/gettest
// @access Private
const getTest = asyncHandler (async (req, res) => {
    const testM = await testModel.find()
    
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
    })
    
    res.status(200).json(testM)
})

// @desc Update Test
// @route GET /api/gettest:id
// @access Private
const updateTest = asyncHandler (async (req, res) => {
    const testM = await testModel.findByIdAndUpdate(req.params.id, req.body, {new: true,})

    res.status(200).json(testM)
})

// @desc Delete Test
// @route GET /api/gettest:id
// @access Private
const deleteTest = asyncHandler (async (req, res) => {
    const testM = await testModel.findById(req.params.id)

    if (!testM) {
        res.status(400)
        throw new Error('testModel not found')
    }

    await testM.deleteOne()

    res.status(200).json({ id: req.params.id })
})

// ???-- Is there a way to put all this and export the class --???
module.exports = {
    getTest,
    createTest,
    updateTest,
    deleteTest
}
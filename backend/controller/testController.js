const asyncHandler = require('express-async-handler')

// @desc Get Test
// @route GET /api/gettest
// @access Private
const getTest = asyncHandler (async (req, res) => {
    res.status(200).json({ message: 'This is a GET test'})
})

// @desc Create Test
// @route POST /api/gettest
// @access Private
const createTest = asyncHandler (async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200).json({ message: 'This is a SET/CREATE test'})
})

// @desc Update Test
// @route GET /api/gettest:id
// @access Private
const updateTest = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `This is a UPDATE test ${req.params.id}`})
})

// @desc Delete Test
// @route GET /api/gettest:id
// @access Private
const deleteTest = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `This is a DELETE test ${req.params.id}`})
})

// ???-- Is there a way to put all this and export the class --???
module.exports = {
    getTest,
    createTest,
    updateTest,
    deleteTest
}